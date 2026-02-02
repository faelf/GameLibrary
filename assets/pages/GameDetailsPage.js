import { gameSchema } from "../data/game-schema.js";
import { config } from "../utils/config.js";
import { form } from "../utils/forms.js";
import { storages } from "../utils/storages.js";

export const GameDetailsPage = {
  title: "Game Details",
  html: "game-details.html",
  setup(gameId) {
    const game = storages.get(config.keys.games, gameId);

    // Make sure the price is displayed 0.00
    if (game && game.price !== undefined) {
      game.price = Number(game.price).toFixed(2);
    }

    const layoutMap = {
      title: "col-12",
      platform: "col-md-4",
      year: "col-md-4",
      region: "col-md-4",
      condition: "col-md-6 col-xl-3",
      status: "col-md-6 col-xl-3",
      price: "col-md-4 col-xl-2",
      purchaseDate: "col-md-4 col-xl-2",
      ownership: "col-md-4 col-xl-2",
      note: "col-12",
    };

    const currency = config.getCurrency();
    const options = {
      rows: 1,
      inputGroupText: currency,
    };

    // Split the schema into two parts
    const gameInfoKeys = ["title", "platform", "year", "region"];
    const gameInfoSchema = {};
    const collectionInfoSchema = {};

    Object.entries(gameSchema).forEach(([key, value]) => {
      if (gameInfoKeys.includes(key)) {
        gameInfoSchema[key] = value;
      } else {
        collectionInfoSchema[key] = value;
      }
    });

    form.render({
      containerId: "game-info-set",
      schema: gameInfoSchema,
      layoutMap,
      options,
      initialData: game,
    });

    form.render({
      containerId: "game-collection-info-set",
      schema: collectionInfoSchema,
      layoutMap,
      options,
      initialData: game,
    });

    const saveBtn = document.getElementById("save-btn");

    saveBtn.addEventListener("click", function () {
      const gameDataToSave = form.getFormData(gameSchema);
      gameDataToSave.id = gameId;
      storages.update(config.keys.games, gameId, gameDataToSave);
    });
  },
};
