import { gamesStorage } from "../data/games-storage.js";
import { config } from "../data/config.js";
import { formatters } from "../utils/formatters.js";

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

    container.innerHTML = /* html */ `
      <h2>${game.title}</h2>
  
      <form class="col-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
        <div class="row mb-3">
          <div class="col-12 col-sm-4">
            <label class="form-label">Title</label>
          </div>
          <div class="col-12 col-sm-8">
            <input type="text" class="form-control" value="${game.title}" readonly>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-12 col-sm-4">
            <label class="form-label">Platform</label>
          </div>
          <div class="col-12 col-sm-8">
            <input type="text" class="form-control" value="${game.platform}" readonly>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-12 col-sm-4">
            <label class="form-label">Year</label>
          </div>
          <div class="col-12 col-sm-8">
            <input type="text" class="form-control" value="${game.year || "N/A"}" readonly>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-12 col-sm-4">
            <label class="form-label">Region</label>
          </div>
          <div class="col-12 col-sm-8">
            <input type="text" class="form-control" value="${game.region || "N/A"}" readonly>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-12 col-sm-4">
            <label class="form-label">Condition</label>
          </div>
          <div class="col-12 col-sm-8">
            <input type="text" class="form-control" value="${game.condition || "N/A"}" readonly>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-12 col-sm-4">
            <label class="form-label">Status</label>
          </div>
          <div class="col-12 col-sm-8">
            <input type="text" class="form-control" value="${game.status || "N/A"}" readonly>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-12 col-sm-4">
            <label class="form-label">Ownership</label>
          </div>
          <div class="col-12 col-sm-8">
            <input type="text" class="form-control" value="${game.ownership || "N/A"}" readonly>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-12 col-sm-4">
            <label class="form-label">Purchase Date</label>
          </div>
          <div class="col-12 col-sm-8">
            <input type="date" class="form-control" value="${game.purchase_date || "N/A"}" readonly>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-12 col-sm-4">
            <label class="form-label">Price</label>
          </div>
          <div class="col-12 col-sm-8">
            <div class="input-group">
              <span class="input-group-text" id="basic-addon1">${config.getCurrency()}</span>
              <input type="text" class="form-control" value="${formatters.price(game.price)}" readonly>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-12 col-sm-4">
            <label class="form-label">Note</label>
          </div>
          <div class="col-12 col-sm-8">
            <textarea class="form-control" rows="2" readonly>${game.note || "N/A"}</textarea>
          </div>
        </div>

      </form>


      <div class="mb-3">
        <button class="btn btn-secondary" onclick="history.back()">
          <span class="bi bi-caret-left-fill"></span> Back to List
        </button>
      </div>
    `;
  },
};
