import { config } from "../data/config.js";
import { gamesStorage } from "../data/games-storage.js";

export const gamesListPage = {
  title: "Games List",
  html: /* html */ `
  <section class="m-2">
    <div class="row g-2 align-items-center mb-3">
      <div class="col-12 col-md-4">
        <h2 class="mb-0">Games List</h2>
      </div>
      <div class="col-12 col-md-5">
        <div class="input-group">
          <span class="input-group-text">
            <span class="bi bi-search"></span>
          </span>
          <input type="text" class="form-control" placeholder="Search by title">
        </div>
      </div>
      <div class="col-12 col-md-3 text-md-end">
        <t-add-game-btn></t-add-game-btn>
      </div>
    </div>
    <div id="games-container">
      <table class="table table-striped table-hover align-middle">
        <thead class="sticky-top">
          <tr>
            <th>Title</th>
            <th>Platform</th>
            <th>Year</th>
            <th>Region</th>
            <th>Condition</th>
            <th>Status</th>
            <th>Ownership</th>
            <th>Purchase</th>
            <th>Price</th>
            <th>Note</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody id="games-list">
        </tbody>
      </table>
    </div>
  </section>
  `,

  setup() {
    // Main render function
    function renderGames() {
      const games = gamesStorage.load();
      const games_container = document.getElementById("games-container");
      const tbody = document.getElementById("games-list");

      // Show empty state if no games exist
      if (games.length === 0) {
        displayEmptyState(games_container);
        return;
      }

      // Clear table and render all games
      tbody.innerHTML = "";
      games.forEach(function (game) {
        addGameRowToTable(game, tbody);
      });

      // Attach click handlers to game title links
      function setupViewGameLinks() {
        const viewLinks = document.querySelectorAll("[data-view-game]");
        viewLinks.forEach(function (link) {
          link.addEventListener("click", function (e) {
            e.preventDefault();
            const gameId = link.getAttribute("data-game-id");

            // Dispatch navigate event with gameId
            document.dispatchEvent(
              new CustomEvent("navigate", {
                detail: {
                  page: "game-details-page",
                  gameId: gameId,
                },
              })
            );
          });
        });
      }

      // Attach event listeners to delete buttons
      setupDeleteButtons();
      setupViewGameLinks();
    }

    // Format purchase date for display
    function formatPurchaseDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }

    // Display empty state message
    function displayEmptyState(container) {
      container.innerHTML = /* html */ `
      <div class="text-center py-5">
        <span class="bi bi-controller display-1 text-muted"></span>
        <h4 class="mt-3">No games in your library yet</h4>
        <p class="text-muted">Click the "Add Game" button to start tracking your collection!</p>
      </div>
    `;
    }

    // Render a single game row
    function addGameRowToTable(game, tbody) {
      const currency = config.getCurrency();
      const locale = config.getLocale();
      const formattedDate = formatPurchaseDate(game.purchase_date);

      tbody.innerHTML += /* html */ `
      <tr>
        <td data-cell="Title">
          <a href="#" class="text-decoration-none" data-view-game data-game-id="${game.id}">
            ${game.title}
          </a>
        </td>
        <td data-cell="Platform">${game.platform || "Unkown"}</td>
        <td data-cell="Year">${game.year || "Unkown"}</td>
        <td data-cell="Region">${game.region || "Unkown"}</td>
        <td data-cell="Condition">${game.condition || "Unkown"}</td>
        <td data-cell="Status">${game.status || "Unkown"}</td>
        <td data-cell="Ownership">${game.ownership || "Unkown"}</td>
        <td data-cell="Purchase Date">${formattedDate}</td>
        <td data-cell="Price">${currency}${parseFloat(game.price).toLocaleString(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}</td>
        <td data-cell="Note">${game.note || " "}</td>
        <td data-cell="Delete" class="text-lg-center">
          <button type="button" class="btn btn-sm btn-danger"
                  data-delete-game
                  data-game-id="${game.id}">
            <span class="bi bi-trash3-fill"></span>
          </button>
        </td>
      </tr>
    `;
    }

    // Attach click handlers to all delete buttons
    function setupDeleteButtons() {
      const deleteButtons = document.querySelectorAll("[data-delete-game]");
      deleteButtons.forEach(function (button) {
        button.addEventListener("click", handleDeleteGame);
      });
    }

    // Handle game deletion
    function handleDeleteGame(event) {
      const button = event.target.closest("button");
      const gameId = parseInt(button.getAttribute("data-game-id"));

      // Ask user to confirm deletion
      const confirmed = confirm("Are you sure you want to delete this game?");
      if (!confirmed) {
        return;
      }

      // Remove game from storage
      removeGameFromStorage(gameId);

      // Reload page
      window.location.reload();
    }

    // Remove a game from localStorage by ID
    function removeGameFromStorage(gameId) {
      const games = gamesStorage.load();
      const updatedGames = games.filter(function (game) {
        return game.id !== gameId;
      });
      gamesStorage.save(updatedGames);
    }

    // Initial render
    renderGames();
  },
};
