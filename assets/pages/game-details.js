import { gamesStorage } from "../data/games-storage.js";
import { config } from "../data/config.js";

export const gameDetailsPage = {
  title: "Game Details",
  html: /* html */ `
  <section id="game-details-container" class="mt-2">
    <!-- Game details will be loaded here -->
  </section>
  `,

  setup(gameId) {
    const games = gamesStorage.load();
    const game = games.find(function (g) {
      return g.id === parseInt(gameId);
    });

    const container = document.getElementById("game-details-container");

    if (!game) {
      container.innerHTML = /* html */ `
        <div class="alert alert-danger">
          <h4>Game not found</h4>
          <p>The game you're looking for doesn't exist.</p>
          <button class="btn btn-secondary" onclick="history.back()">Go Back</button>
        </div>
      `;
      return;
    }

    // Format purchase date for display
    function formatPurchaseDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }

    const formattedDate = formatPurchaseDate(game.purchase_date);
    const currency = config.getCurrency();

    container.innerHTML = /* html */ `
      <h2>${game.title}</h2>
  
      <dl class="row">
        <dt class="col-sm-6">Title:</dt><dd class="col-sm-6">${game.title}</dd>
        <dt class="col-sm-6">Platform:</dt><dd class="col-sm-6">${game.platform}</dd>
        <dt class="col-sm-6">Year:</dt><dd class="col-sm-6">${game.year || "N/A"}</dd>
        <dt class="col-sm-6">Region:</dt><dd class="col-sm-6">${game.region || "N/A"}</dd>
        <dt class="col-sm-6">Condition:</dt><dd class="col-sm-6">${game.condition || "N/A"}</dd>
        <dt class="col-sm-6">Status:</dt><dd class="col-sm-6">${game.status || "N/A"}</dd>
        <dt class="col-sm-6">Ownership:</dt><dd class="col-sm-6">${game.ownership || "N/A"}</dd>
        <dt class="col-sm-6">Purchase Date:</dt><dd class="col-sm-6">${formattedDate || "N/A"}</dd>
        <dt class="col-sm-6">Price:</dt><dd class="col-sm-6">${currency}${parseFloat(game.price || 0).toFixed(2)}</dd>
        <dt class="col-sm-6">Note:</dt><dd class="col-sm-6">${game.note || "N/A"}</dd>
      </dl>

      <div class="mb-3">
        <button class="btn btn-secondary" onclick="history.back()">
          <span class="bi bi-arrow-left"></span> Back to List
        </button>
      </div>
    `;
  },
};
