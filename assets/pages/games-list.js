import { gamesStorage } from "../data/games-storage.js";
import { toast } from "../utils/toast.js";

export const gamesListPage = {
  title: "Games List",
  html: /* html */ `
  <section class="m-2">
    <h2 class="mb-3">Games List</h2>
    <div class="row g-2 mb-3">
      <div class="col-8 col-sm-9">
        <div class="input-group">
          <span class="input-group-text">
            <span class="bi bi-search"></span>
          </span>
          <input type="text" class="form-control" placeholder="Search by title">
        </div>
      </div>
      <div class="col-4 col-sm-3 text-end">
        <ui-btn-add-game></ui-btn-add-game>
      </div>
    </div>
    <div id="games-container">
      <table class="table table-striped table-hover align-middle">
        <thead class="sticky-top">
          <tr>
            <th>Title</th>
            <th>Platform</th>
            <th>Region</th>
            <th>Status</th>
            <th>Ownership</th>
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
      tbody.innerHTML += /* html */ `
      <tr>
        <td data-cell="Title">
          <a href="#" class="text-decoration-none" data-view-game data-game-id="${game.id}">
            ${game.title}
          </a>
        </td>
        <td data-cell="Platform">${game.platform || "Unkown"}</td>
        <td data-cell="Region">${game.region || "Unkown"}</td>
        <td data-cell="Status">
          <select class="form-select form-select-sm status-select" data-field="status" data-id="${game.id}">
            <option value="" disabled>Status</option>
            <option value="Not started" ${game.status === "Not started" ? "selected" : ""}>Not started</option>
            <option value="Playing" ${game.status === "Playing" ? "selected" : ""}>Playing</option>
            <option value="Completed" ${game.status === "Completed" ? "selected" : ""}>Completed</option>
          </select>
        </td>
        <td data-cell="Ownership">
          <select class="form-select form-select-sm ownership-select" data-field="ownership" data-id="${game.id}">
            <option value="" disabled>Select ownership status</option>
            <option value="In Collection" ${game.ownership === "In Collection" ? "selected" : ""}>In Collection</option>
            <option value="Borrowed" ${game.ownership === "Borrowed" ? "selected" : ""}>Borrowed</option>
            <option value="Lent Out" ${game.ownership === "Lent Out" ? "selected" : ""}>Lent to Someone</option>
            <option value="Sold" ${game.ownership === "Sold" ? "selected" : ""}>Sold</option>
          </select>
        </td>

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

    // Handle changes in select elements
    document.addEventListener("change", (e) => {
      const select = e.target.closest(".form-select");
      if (!select) return;

      const gameId = Number(select.dataset.id);
      const field = select.dataset.field;
      const value = select.value;

      if (!gameId || !field) return;

      const games = gamesStorage.load();
      const game = games.find((g) => g.id === gameId);

      if (!game) return;

      game[field] = value;

      gamesStorage.save(games);
      toast.success("Game updated successfully!");
    });

    // Attach click handlers to all delete buttons
    function setupDeleteButtons() {
      const deleteButtons = document.querySelectorAll("[data-delete-game]");
      deleteButtons.forEach(function (button) {
        button.addEventListener("click", handleDeleteGame);
      });
    }

    // Remove a game from localStorage by ID
    function removeGameFromStorage(gameId) {
      const games = gamesStorage.load();
      const updatedGames = games.filter(function (game) {
        return game.id !== gameId;
      });
      gamesStorage.save(updatedGames);
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

    // Initial render
    renderGames();
  },
};
