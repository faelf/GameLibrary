import { config } from "../data/config.js";
import { gamesStorage } from "../data/games-storage.js";

export const gamesListPage = {
  title: "Games List",
  html: /* html */ `
  <section class="m-2">
    <h2>Games List</h2>
    <div class="d-flex justify-content-end">
      <t-add-game></t-add-game>
    </div>
    <div id="games-container">
      <table class="table table-striped table-hover align-middle">
        <thead class="sticky-top">
          <tr>
            <th>Name</th><th>Platform</th><th>Year</th><th>Status</th><th>Purchase</th><th>Price</th><th>Edit</th><th>Delete</th>
          </tr>
        </thead>
        <tbody id="games-list" class="table-group-divider">
        </tbody>
      </table>
    </div>
  </section>
  `,

  setup() {
    const games = gamesStorage.load();
    console.log(games);

    const games_container = document.getElementById("games-container");
    const tbody = document.getElementById("games-list");

    if (games.length === 0) {
      games_container.innerHTML = /* html */ `
        <div class="text-center py-5">
          <span class="bi bi-controller display-1 text-muted"></span>
          <h4 class="mt-3">No games in your library yet</h4>
          <p class="text-muted">Click the "Add Game" button to start tracking your collection!</p>
        </div>
        `;
      return;
    }

    function renderGameRow(game) {
      const currency = config.getCurrency();

      const date = new Date(game.purchase_date);
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      tbody.innerHTML += /* html */ `
      <tr>
        <td data-cell="Name">${game.name}</td>
        <td data-cell="Platform">${game.platform}</td>
        <td data-cell="Year">${game.year}</td>
        <td data-cell="Status">${game.status}</td>
        <td data-cell="Purchase Date">${formattedDate}</td>
        <td data-cell="Price">
          ${currency}
          ${parseFloat(game.price).toFixed(2)}
        </td>
        <td data-cell="Edit" class="text-lg-center">
          <button type="button" class="btn btn-sm btn-warning">
            <span class="bi bi-pencil-square"></span>
          </button>
        </td>
        <td data-cell="Delete" class="text-lg-center">
          <button type="button" class="btn btn-sm btn-danger">
            <span class="bi bi-trash3-fill"></span>
          </button>
        </td>
      </tr>
    `;
    }

    games.forEach(renderGameRow);
  },
};
