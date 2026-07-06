import { config } from "../utils/config.js";
import { storages } from "../utils/storages.js";
import * as formEngine from "../utils/forms.js";
import { gameSchema } from "../data/game-schema.js";
import * as tableUtil from "../utils/table.js";
import GamesListPageHtml from "../html/games-list.html?raw";

export const GamesListPage = {
  title: "Games List",
  html: GamesListPageHtml,
  async setup() {
    // --- Add Game Modal --------------------------
    const layoutMap = {
      title: "col-12",
      platform: "col-lg-6",
      "release-year": "col-lg-6",
      region: "col-lg-6",
      condition: "col-lg-6",
      status: "col-lg-6",
      "price-paid": "col-lg-6",
      "purchase-date": "col-lg-6",
      "ownership-status": "col-lg-6",
      note: "col-12",
    };

    const currency = config.getCurrency();

    const options = {
      rows: 1,
      inputGroupText: currency,
    };

    formEngine.render({
      containerId: "form-row",
      schema: gameSchema,
      layoutMap,
      options,
    });

    const modalElement = document.getElementById("add-game");
    const addBtn = document.getElementById("add-game-btn");

    addBtn.addEventListener("click", async function () {
      const newGame = formEngine.getFormData(gameSchema);
      newGame.id = Date.now();
      await storages.add(config.keys.games, newGame);
      const modal = bootstrap.Modal.getInstance(modalElement);
      renderGames();
      if (modal) modal.hide();
    });

    // --- Table Loading --------------------------
    const tableContainer = document.querySelector("#games-container");

    async function loadgames() {
      const games = await storages.load(config.keys.games);
      return games;
    }

    async function renderGames() {
      const games = await loadgames();

      // Clear UI before re-rendering
      tableContainer.innerHTML = "";

      // Empty State Check (If there is no games)
      if (!games || games.length === 0) {
        tableUtil.emptyTable(tableContainer);
      }

      tableUtil.loadTable({
        container: "#games-container",
        columns: {
          title: "Title",
          platform: "Platform",
          "release-year": "Release Year",
          region: "Region",
          condition: "Condition",
          status: "Status",
          "price-paid": "Price Paid",
          "purchase-date": "Purchase Date",
          "ownership-status": "Ownership Status",
          note: "Note",
        },
        data: games,
      });
    }

    renderGames();
  },
};
