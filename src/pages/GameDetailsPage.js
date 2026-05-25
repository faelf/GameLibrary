import { gameSchema } from "../data/game-schema.js";
import { config } from "../utils/config.js";
import { formEngine } from "../utils/forms.js";
import { storages } from "../utils/storages.js";
import { toast } from "../utils/toast.js";
import GameDetailsPageHtml from "../html/game-details.html?raw";

export const GameDetailsPage = {
  title: "Game Details",
  html: GameDetailsPageHtml,
  async setup(gameId) {
    const game = await storages.get(config.keys.games, gameId);

    if (!game) {
      toast.error({ text: "Game not found" });
      return;
    }

    // Make sure the price-paid is displayed 0.00
    if (game && game["price-paid"] !== undefined) {
      game["price-paid"] = Number(game["price-paid"]).toFixed(2);
    }

    const layoutMap = {
      title: "col-12",
      platform: "col-sm-6",
      "release-year": "col-sm-6",
      region: "col-sm-6",
      condition: "col-sm-6",
      status: "col-sm-6",
      "price-paid": "col-sm-6",
      "purchase-date": "col-sm-6",
      "ownership-status": "col-sm-6",
      note: "col-12",
    };

    const currency = config.getCurrency();
    const options = {
      rows: 1,
      inputGroupText: currency,
    };

    // Split the schema into two parts
    const gameInfoKeys = ["title", "platform", "release-year", "region"];
    const gameInfoSchema = {};
    const collectionInfoSchema = {};

    Object.entries(gameSchema).forEach(([key, value]) => {
      if (gameInfoKeys.includes(key)) {
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
      const gameDataToSave = formEngine.getFormData(gameSchema);

      // Ensure numeric values are stored as numbers, not strings
      gameDataToSave["release-year"] = gameDataToSave["release-year"]
        ? Number(gameDataToSave["release-year"])
        : "";
      gameDataToSave["price-paid"] = gameDataToSave["price-paid"]
        ? Number(gameDataToSave["price-paid"])
        : 0;

      gameDataToSave.id = gameId;
      await storages.update(config.keys.games, gameId, gameDataToSave);
      toast.success({ text: "Game details updated successfully!" });
    });

    const deleteBtn = document.querySelector("#delete-btn");

    deleteBtn.addEventListener("click", async (e) => {
      if (
        toast.success({
          text: "Game deleted.",
          alert: "Are you sure you want to delete this game?",
        })
      ) {
        await storages.remove(config.keys.games, gameId);
        window.location.hash = "games-list-page";
      } else {
        return;
      }
    });
  },
};
