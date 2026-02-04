import { config } from "../utils/config.js";
import { storages } from "../utils/storages.js";
import { table } from "../utils/table.js";
import { gameSchema } from "../data/game-schema.js";
import { pagination } from "../utils/pagination.js";
import { toast } from "../utils/toast.js";

export const GamesListPage = {
  title: "Games List",
  html: "games-list.html",
  setup() {
    // --- DOM Elements ---
    const displayItems = document.getElementById("display-items");
    const searchInput = document.getElementById("search-input");
    const tbody = document.getElementById("games-table-body");
    const thead = document.getElementById("games-table-head");
    const emptyTable = document.getElementById("empty-table");
    const paginationContainer = document.getElementById("pagination-controls");

    // --- State Variables ---
    let itemsPerPage = 10;
    let currentPage = 1;

    // --- Core Functions ---

    // Pagination Handler
    // Defined here so it can be used by renderGames and event listeners
    const handlePageChange = pagination.createPageHandler(
      (newPage) => (currentPage = newPage),
      renderGames,
    );

    /**
     * Renders the games list table or an empty state message.
     * Handles filtering, pagination, and table generation.
     */
    function renderGames() {
      const games = storages.load(config.keys.games);

      // Clear UI before re-rendering
      thead.innerHTML = "";
      tbody.innerHTML = "";
      emptyTable.innerHTML = "";
      paginationContainer.innerHTML = "";

      // Empty State Check (If there is no games)
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

      // Search
      const searchTerm = searchInput.value.toLowerCase();
      const filteredGames = games.filter((game) =>
        game.title.toLowerCase().includes(searchTerm),
      );

      // No Search Results Check
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

      // Render the table with the paginated pages
      table.render({
        thead: "games-table-head",
        tbody: "games-table-body",
        columns: {
          title: gameSchema.title,
          platform: gameSchema.platform,
          year: gameSchema.year,
          region: gameSchema.region,
          condition: gameSchema.condition,
          status: gameSchema.status,
          price: gameSchema.price,
          purchaseDate: gameSchema.purchaseDate,
          ownership: gameSchema.ownership,
          deleteBtn: { labelText: "Delete" },
        },
        data: pagination.paginateItems({
          items: filteredGames,
          currentPage,
          itemsPerPage,
        }),
        options: {
          hyperlink: "title",
          hyperlinkTarget: "game-details-page",
          longDate: "purchaseDate",
          currencySymbol: "price",
          deleteBtn: true,
        },
      });

      // Render Pagination Controls
      pagination.render({
        containerId: "pagination-controls",
        totalItems: filteredGames.length,
        itemsPerPage,
        currentPage,
        onPageChange: handlePageChange,
      });
    }

    // --- Event Listeners ---

    // Items Per Page Selection
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

    // Search Input Filter
    searchInput.addEventListener("input", () => {
      currentPage = 1;
      renderGames();
    });

    // Table Actions (Delete)
    tbody.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-delete-item]");
      if (btn) {
        const id = btn.closest("tr").dataset.id;
        if (
          toast.success(
            "Game deleted.",
            "Are you sure you want to delete this game?",
          )
        ) {
          storages.remove(config.keys.games, id);
          renderGames();
        }
      }
    });

    // Global Events (Game Added)
    document.addEventListener("game-added", () => {
      const lastPage = {
        totalItems: storages.load(config.keys.games).length,
      };
      handlePageChange(pagination.getLastPage(lastPage));
    });

    // --- Initialisation ---
    renderGames();
  },
};
