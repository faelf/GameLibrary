import GameDetailsPageHtml from "../html/game-details.html?raw";
import { gameSchema } from "../data/game-schema.js";
import * as config from "../utils/config.js";
import * as alerts from "../utils/alerts.js";
import * as formEngine from "../utils/forms.js";
import * as storages from "../utils/storages.js";
import * as toast from "../utils/toast.js";

export const GameDetailsPage = {
  title: "Game Details",
  html: GameDetailsPageHtml,
  async setup(gameId) {
    const game = await storages.get(config.keys.games, gameId);

    if (!game) {
      window.location.hash = "games-list-page";
      toast.error({ text: "Game not found" });
      return;
    }

    // Make sure the price-paid is displayed 0.00
    if (game && game["price-paid"] !== undefined) {
      game["price-paid"] = Number(game["price-paid"]).toFixed(2);
    }

    const layoutMap = {
      title: "col-12",
      platform: "col-sm-6 col-md-4",
      region: "col-sm-6 col-md-4",
      "release-date": "col-sm-6 col-md-4",

      condition: "col-sm-6 col-md-4",
      status: "col-sm-6 col-md-4",
      "price-paid": "col-sm-6 col-md-4",
      "purchase-date": "col-sm-6 col-md-4",
      "ownership-status": "col-sm-6 col-md-4",

      note: "col-12",
    };

    const currency = config.getCurrency();
    const options = {
      rows: 3,
      inputGroupText: currency,
    };

    // Split the schema into two parts
    const gameInfoKeys = ["title", "platform", "region", "release-date"];
    const gameInfoSchema = {};
    const collectionInfoSchema = {};

    Object.entries(gameSchema).forEach(([key, value]) => {
      if (gameInfoKeys.includes(key)) {
        value.name = key;
        gameInfoSchema[key] = value;
      } else {
        collectionInfoSchema[key] = value;
      }
    });

    formEngine.render({
      containerId: "game-info-set",
      schema: gameInfoSchema,
      layoutMap,
      options,
      initialData: game,
    });

    formEngine.render({
      containerId: "game-collection-info-set",
      schema: collectionInfoSchema,
      layoutMap,
      options,
      initialData: game,
    });

    const editForm = document.getElementById("game-edit-form");

    editForm.addEventListener("reset", async function (event) {
      event.preventDefault();
      const savedGame = await storages.get(config.keys.games, gameId);

      if (savedGame && savedGame["price-paid"] !== undefined) {
        savedGame["price-paid"] = Number(savedGame["price-paid"]).toFixed(2);
      }

      formEngine.populate({
        formID: "#game-edit-form",
        data: savedGame || game,
      });
    });

    editForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      const gameDataToSave = formEngine.getData("#game-edit-form");

      gameDataToSave["release-year"] = gameDataToSave["release-year"]
        ? Number(gameDataToSave["release-year"])
        : "";
      gameDataToSave["price-paid"] = gameDataToSave["price-paid"]
        ? Number(gameDataToSave["price-paid"])
        : "";

      gameDataToSave.id = gameId;
      await storages.update(config.keys.games, gameId, gameDataToSave);
      toast.success({ text: "Game details updated successfully!" });
    });

    const deleteBtn = document.querySelector("#delete-btn");

    deleteBtn.addEventListener("click", async (e) => {
      const confirmed = await alerts.confirm(
        `Are you sure you want to delete ${game.title}?`,
      );
      if (confirmed) {
        await storages.remove(config.keys.games, gameId);
        document.dispatchEvent(
          new CustomEvent("navigate", {
            detail: { pageKey: "games-list-page" },
          }),
        );
        toast.success({ text: "Game deleted successfully!" });
      }
    });
  },
};
