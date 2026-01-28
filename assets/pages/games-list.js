import { config } from "../utils/config.js";
import { storages } from "../utils/storages.js";
import { table } from "../utils/table.js";
import { gameSchema } from "../data/game-schema.js";
import { pagination } from "../utils/pagination.js";

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
          <input id="search-input" type="text" class="form-control" placeholder="Search by title">
        </div>
      </div>
      <div class="col-4 col-sm-3 text-end">
        <ui-btn-add-game></ui-btn-add-game>
      </div>
    </div>
    <table class="table table-striped table-borderless table-hover">
      <thead id="games-table-head" class="sticky-top align-middle">
        <!-- Headers will be populated dynamically -->
      </thead>
      <tbody id="games-table-body" class="align-middle">
        <!-- Game rows will be populated dynamically -->
      </tbody>
    </table>
    <nav id="pagination-controls" class="mt-3" aria-label="Game list navigation"></nav>
    <div id="empty-table">
    </div>
  </section>
  `,

  setup() {
    // Variable that controls the page navigation
    let currentPage = 1;

    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", () => {
      currentPage = 1;
      renderGames();
    });

    const handlePageChange = pagination.createPageHandler((newPage) => (currentPage = newPage), renderGames);

    /**
     * Renders the games list table or an empty state message.
     */
    function renderGames() {
      const emptyTable = document.getElementById("empty-table");
      const thead = document.getElementById("games-table-head");
      const games = storages.load(config.keys.games);
      const tbody = document.getElementById("games-table-body");

      // Clear table content before re-rendering
      thead.innerHTML = "";
      tbody.innerHTML = "";
      emptyTable.innerHTML = "";
      document.getElementById("pagination-controls").innerHTML = "";

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

      // Filter games based on search input
      const searchTerm = searchInput.value.toLowerCase();
      const filteredGames = games.filter((game) => game.title.toLowerCase().includes(searchTerm));

      if (filteredGames.length === 0) {
        emptyTable.innerHTML = /* html */ `
          <div class="text-center py-5">
            <span class="bi bi-search display-1 text-muted"></span>
            <h4 class="mt-3">No results found</h4>
            <p class="text-muted">Try adjusting your search terms.</p>
          </div>
        `;
        return;
      }

      // Render table head
      const tableColumns = {
        title: gameSchema.title,
        platform: gameSchema.platform,
        year: gameSchema.year,
        region: gameSchema.region,
        condition: gameSchema.condition,
        status: gameSchema.status,
        price: gameSchema.price,
        purchaseDate: gameSchema.purchaseDate,
        ownership: gameSchema.ownership,
      };

      table.addTHeader({
        theadElement: thead,
        thColumns: tableColumns,
      });

      // Pagination logic
      // It will slice the games array into pages
      const paginatedGames = pagination.paginateItems({
        items: filteredGames,
        currentPage, // currentPage: currentPage
      });

      // Render table body with the sliced games array
      table.addTBody({
        tbodyElement: tbody,
        tdColumns: tableColumns,
        tdData: paginatedGames,
        tdConfig: {
          hyperlink: "title",
          hyperlinkTarget: "game-details-page",
          longDate: "purchaseDate",
          currencySymbol: "price",
        },
      });

      // Render pagination controls
      pagination.render({
        containerId: "pagination-controls",
        totalItems: filteredGames.length,
        currentPage,
        onPageChange: handlePageChange,
      });
    }

    document.addEventListener("game-added", () => {
      const lastPage = {
        totalItems: storages.load(config.keys.games).length,
      };
      // Makes the current page the last
      handlePageChange(pagination.getLastPage(lastPage));
    });

    // Initial render
    renderGames();
  },
};
