import { gameSchema } from "../data/game-schema.js";
import { config } from "../utils/config.js";
import { form } from "../utils/forms.js";
import { storages } from "../utils/storages.js";
import { toast } from "../utils/toast.js";

export const GameDetailsPage = {
  title: "Game Details",
  html: "game-details.html",
  setup(gameId) {
    const game = storages.get(config.keys.games, gameId);

    if (!game) {
      toast.error("Game not found");
      return;
    }

    // Make sure the price is displayed 0.00
    if (game && game.price !== undefined) {
      game.price = Number(game.price).toFixed(2);
    }

    const layoutMap = {
      title: "col-12",
      platform: "col-sm-6",
      year: "col-sm-6",
      region: "col-sm-6",
      condition: "col-sm-6",
      status: "col-sm-6",
      price: "col-sm-6",
      purchaseDate: "col-sm-6",
      ownership: "col-sm-6",
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

    const editForm = document.getElementById("game-edit-form");

    editForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const gameDataToSave = form.getFormData(gameSchema);

      // Ensure numeric values are stored as numbers, not strings
      gameDataToSave.year = gameDataToSave.year
        ? Number(gameDataToSave.year)
        : "";
      gameDataToSave.price = gameDataToSave.price
        ? Number(gameDataToSave.price)
        : 0;

      gameDataToSave.id = Number(gameId);
      storages.update(config.keys.games, gameId, gameDataToSave);
      toast.success("Game details updated successfully!");
    });
  },
};
