import GamesListPageHtml from "../html/games-list.html?raw";
import { gameSchema } from "../data/game-schema.js";
import * as pagination from "../utils/pagination.js";
import * as config from "../utils/config.js";
import * as storages from "../utils/storages.js";
import * as tableUtil from "../utils/table.js";
import * as formEngine from "../utils/forms.js";

export const GamesListPage = {
  title: "Games List",
  html: GamesListPageHtml,
  async setup() {
    let allGames = [];
    let currentPage = 1;

    const modalElement = document.getElementById("add-game");
    const addGameForm = document.getElementById("add-game-form");
    const itemsPerPageSelect = document.querySelector("#display-items");
    const searchInput = document.querySelector("#search-input");
    const tableContainer = document.querySelector("#games-container");

    let itemsPerPage = Number(itemsPerPageSelect.value);

    const currency = config.getCurrency();
    const options = {
      rows: 1,
      inputGroupText: currency,
    };

    const layoutMap = {
      title: "col-12",
      platform: "col-lg-6",
      "release-date": "col-lg-6",
      region: "col-lg-6",
      condition: "col-lg-6",
      status: "col-lg-6",
      "price-paid": "col-lg-6",
      "purchase-date": "col-lg-6",
      "ownership-status": "col-lg-6",
      note: "col-12",
    };

    formEngine.render({
      containerId: "form-row",
      schema: gameSchema,
      layoutMap,
      options,
    });

    addGameForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      const newGame = Object.fromEntries(new FormData(addGameForm));
      newGame.createdAt = new Date().toISOString().split("T")[0];
      await storages.add(config.keys.games, newGame);
      const modal = bootstrap.Modal.getInstance(modalElement);
      currentPage = 1;
      await loadGames();
      if (modal) modal.hide();
    });

    itemsPerPageSelect.addEventListener("change", (event) => {
      const value = event.target.value;
      if (value === "all") {
        itemsPerPage = allGames.length || 1;
      } else {
        itemsPerPage = Number(value);
      }
      currentPage = 1;
      render();
    });

    searchInput.addEventListener("input", () => {
      currentPage = 1;
      render();
    });

    function applyFilters() {
      const searchTerm = searchInput.value.toLowerCase();
      if (!searchTerm) {
        return [...allGames];
      }
      return allGames.filter((game) =>
        game.title.toLowerCase().includes(searchTerm),
      );
    }

    function render() {
      tableContainer.innerHTML = "";

      if (!allGames || allGames.length === 0) {
        tableUtil.emptyTable(tableContainer);
        return;
      }

      const filteredGames = applyFilters();

      if (filteredGames.length === 0) {
        tableContainer.innerHTML = /*html*/ `
          <div class="text-center py-5">
            <h4 class="mt-3">No results found for ${searchInput.value}</h4>
            <p class="text-muted">Try adjusting your search terms.</p>
          </div>`;
        return;
      }

      const paginatedGames = pagination.paginateItems({
        items: filteredGames,
        currentPage,
        itemsPerPage,
      });

      tableUtil.loadTable({
        container: "#games-container",
        columns: {
          title: "Title",
          platform: "Platform",
          "release-date": "Release Date",
          region: "Region",
          // condition: "Condition",
          // status: "Status",
          "price-paid": "Price Paid",
          // "purchase-date": "Purchase Date",
          "ownership-status": "Ownership Status",
          // note: "Note",
        },
        data: paginatedGames,
      });

      const paginationElement = pagination.create({
        totalItems: filteredGames.length,
        itemsPerPage,
        currentPage,
        onPageChange: (newPage) => {
          currentPage = newPage;
          render();
        },
      });

      if (paginationElement) {
        tableContainer.appendChild(paginationElement);
      }
    }

    async function loadGames() {
      let games = (await storages.load(config.keys.games)) || [];
      await addCreatedAt(games);
      games.sort((a, b) =>
        (b.createdAt || "").localeCompare(a.createdAt || ""),
      );
      allGames = games;
      render();
    }

    async function addCreatedAt(games) {
      const today = new Date().toISOString().split("T")[0];
      const updates = [];

      games.forEach((game) => {
        if (!game.createdAt) {
          game.createdAt = today;
          updates.push(
            storages.update(config.keys.games, game.id, { createdAt: today }),
          );
        }
      });

      if (updates.length > 0) {
        await Promise.all(updates);
      }
    }

    loadGames();
  },
};
