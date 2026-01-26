import { gameSchema } from "../data/game-schema.js";
import { config } from "../utils/config.js";
import { form } from "../utils/forms.js";
import { storages } from "../utils/storages.js";

export const gameDetailsPage = {
  title: "Game Details",
  html: /* html */ `
  <section id="game-details-container" class="mt-2">
    <h2 class="mb-3">
      Game Details
    </h2>
    <form id="game-edit-form" class="row">
    <fieldset>
      <legend>Game Info</legend>
      <div id="game-info-set" class="row"></div>
      <!-- Game Form Fields -->
    </fieldset>
    <fieldset>
      <legend>Collection Info</legend>
      <div id="game-collection-info-set" class="row"></div>
      <!-- Game Form Fields -->
    </fieldset>
    <div class="col-12 text-end">
      <button id="save-btn" type="button" class="btn btn-primary">💾 Save</button>
      <button id="save-btn" type="reset" class="btn btn-warning">🗑️ Clear</button>
    </div>
    </form>
  </section>
  `,

  setup(gameId) {
    const game = storages.get(config.keys.games, gameId);
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

    form.render("game-info-set", gameInfoSchema, layoutMap, options, game);
    form.render("game-collection-info-set", collectionInfoSchema, layoutMap, options, game);

    const saveBtn = document.getElementById("save-btn");

    saveBtn.addEventListener("click", function () {
      const gameDataToSave = form.getFormData(gameSchema);
      gameDataToSave.id = gameId;
      storages.update(config.keys.games, gameId, gameDataToSave);
    });
  },
};
