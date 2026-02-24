import { config } from "../utils/config.js";
import { storages } from "../utils/storages.js";
import { table } from "../utils/table.js";
import { gameSchema } from "../data/game-schema.js";
import { pagination } from "../utils/pagination.js";
import { toast } from "../utils/toast.js";
import GamesListPageHtml from "../html/games-list.html?raw";

export const GamesListPage = {
  title: "Games List",
  html: GamesListPageHtml,
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg-page mx-auto">
            <line x1="6" x2="10" y1="11" y2="11"/>
            <line x1="8" x2="8" y1="9" y2="13"/>
            <line x1="15" x2="15.01" y1="12" y2="12"/>
            <line x1="18" x2="18.01" y1="10" y2="10"/>
            <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/>
            </svg>
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
