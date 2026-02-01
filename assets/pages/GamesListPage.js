import { config } from "../utils/config.js";
import { storages } from "../utils/storages.js";
import { table } from "../utils/table.js";
import { gameSchema } from "../data/game-schema.js";
import { pagination } from "../utils/pagination.js";

export const GamesListPage = {
  title: "Games List",
  html: "games-list.html",
  setup() {
    // Display items settings
    const displayItems = document.getElementById("display-items");
    let itemsPerPage = 10;

    displayItems.addEventListener("change", (e) => {
      const value = e.target.value;
      if (value === "all") {
        itemsPerPage = storages.load(config.keys.games).length;
      } else {
        itemsPerPage = Number(value);
      }
      currentPage = 1;
      renderGames();
    });

    // Variable that controls the page navigation
    let currentPage = 1;

    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", () => {
      currentPage = 1;
      renderGames();
    });

    const handlePageChange = pagination.createPageHandler(
      (newPage) => (currentPage = newPage),
      renderGames,
    );

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
      const filteredGames = games.filter((game) =>
        game.title.toLowerCase().includes(searchTerm),
      );

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
        itemsPerPage,
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
        itemsPerPage,
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
