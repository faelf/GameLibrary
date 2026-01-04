import { config } from "../utils/config.js";
import { storages } from "../utils/storages.js";
import { addTableHeader, addTableRow } from "../utils/table.js";
import { gameSchema } from "../data/game-schema.js";

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
    <table class="table table-striped table-hover align-middle">
      <thead id="games-table-head" class="sticky-top">
        <!-- Headers will be populated dynamically -->
      </thead>
      <tbody id="games-table-body">
        <!-- Game rows will be populated dynamically -->
      </tbody>
    </table>
    <div id="empty-table">
    </div>
  </section>
  `,

  setup() {
    /**
     * Renders the games list table or an empty state message.
     * @returns Table headers and rows or empty state.
     */
    function renderGames() {
      const emptyTable = document.getElementById("empty-table");
      const thead = document.getElementById("games-table-head");
      const games = storages.load(config.keys.games);
      const tbody = document.getElementById("games-table-body");

      // Show empty state if no games exist
      if (games.length === 0) {
        emptyTable.innerHTML = /* html */ `
          <div class="text-center py-5">
            <span class="bi bi-controller display-1 text-muted"></span>
            <h4 class="mt-3">No games in your library yet</h4>
            <p class="text-muted">Click the "Add Game" button to start tracking your collection!</p>
          </div>
        `;
        return;
      }

      // Clear table and render all games
      tbody.innerHTML = "";

      // Columns to be rendered
      const tableHeaders = [
        gameSchema.title.labelText,
        gameSchema.platform.labelText,
        gameSchema.region.labelText,
        gameSchema.status.labelText,
        gameSchema.ownership.labelText,
        "Delete",
      ];

      // Render table head
      addTableHeader(thead, tableHeaders);

      // Render table body
      games.forEach((game) => {
        addTableRow(tbody, tableHeaders, game);
      });
    }
    // Initial render
    renderGames();
  },
};
