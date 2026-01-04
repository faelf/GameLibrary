import { gamesStorage } from "../data/games-storage.js";
import { config } from "../utils/config.js";
import { formatters } from "../utils/formatters.js";

export const gameDetailsPage = {
  title: "Game Details",
  html: /* html */ `
  <section id="game-details-container" class="mt-2">
    <h2 class="mb-3" id="game-title"></h2>
  
      <form class="col-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
        <!-- Title Input -->
        <div class="row mb-3">
          <div class="col-12 col-sm-4">
            <label for="game-title-input" class="form-label">Title</label>
          </div>
          <div class="col-12 col-sm-8">
            <input id="game-title-input" type="text" class="form-control">
          </div>
        </div>

        <!-- Platform Input -->
        <div class="row mb-3">
          <div class="col-12 col-sm-4">
            <label class="form-label" for="game-platform-input">Platform</label>
          </div>
          <div class="col-12 col-sm-8">
            <select class="form-select" id="game-platform-input" name="game-platform-input" required>
              <option value="" disabled>Select a platform</option>
              <option value="Nintendo Entertainment System">Nintendo Entertainment System</option>
              <option value="Super Nintendo">Super Nintendo</option>
              <option value="Nintendo 64">Nintendo 64</option>
              <option value="Nintendo GameCube">GameCube</option>
              <option value="Nintendo Wii">Wii</option>
              <option value="Nintendo Wii U">Wii U</option>
              <option value="Nintendo Switch">Nintendo Switch</option>
              <option value="Nintendo Switch 2">Nintendo Switch 2</option>
              <option value="Game Boy">Game Boy</option>
              <option value="Game Boy Color">Game Boy Color</option>
              <option value="Game Boy Advance">Game Boy Advance</option>
              <option value="Nintendo DS">Nintendo DS</option>
              <option value="Nintendo 3DS">Nintendo 3DS</option>
              <option value="PC">PC</option>
              <option value="Steam">Steam</option>
            </select>
          </div>
        </div>

        <!-- Year Input -->
        <div class="row mb-3">
          <div class="col-12 col-sm-4">
            <label for="game-year-input" class="form-label">Release year</label>
          </div>
          <div class="col-12 col-sm-8">
            <input id="game-year-input" type="number" class="form-control">
          </div>
        </div>

        <!-- Region Input -->
        <div class="row mb-3">
          <div class="col-12 col-sm-4">
            <label for="game-region-input" class="form-label">Region</label>
          </div>
          <div class="col-12 col-sm-8">
            <select class="form-select" id="game-region-input" name="game-region">
              <option value="" disabled>Select region</option>
              <option value="Europe">Europe</option>
              <option value="UK">UK</option>
              <option value="France">France</option>
              <option value="Germany">Germany</option>
              <option value="North America">North America</option>
              <option value="Japan">Japan</option>
              <option value="Region Free">Region Free</option>
            </select>
          </div>
        </div>

        <!-- Condition Input -->
        <div class="row mb-3">
          <div class="col-12 col-sm-4">
            <label for="game-condition-input" class="form-label">Condition</label>
          </div>
          <div class="col-12 col-sm-8">
            <select class="form-select" id="game-condition-input" name="game-condition">
              <option value="" disabled>Select a condition</option>
              <option value="Sealed">Sealed</option>
              <option value="Collector's Edition">Collector's Edition</option>
              <option value="CIB">Complete in box</option>
              <option value="Game and box">Game & Box</option>
              <option value="Game and manual">Game & Manual</option>
              <option value="Game only">Game only</option>
              <option value="Box and manual">Box & Manual</option>
              <option value="Box only">Box only</option>
              <option value="Manual only">Manual only</option>
              <option value="Digital">Digital</option>
            </select>
          </div>
        </div>

        <!-- Status Input -->
        <div class="row mb-3">
          <div class="col-12 col-sm-4">
            <label for="game-status-input" class="form-label">Status</label>
          </div>
          <div class="col-12 col-sm-8">
            <select class="form-select" id="game-status-input" name="game-status">
              <option value="" disabled>Status</option>
              <option value="Not started">Not started</option>
              <option value="Playing">Playing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <!-- Ownership Status Input -->
        <div class="row mb-3">
          <div class="col-12 col-sm-4">
            <label for="game-ownership-status-input" class="form-label">Ownership</label>
          </div>
          <div class="col-12 col-sm-8">
            <select class="form-select" id="game-ownership-status-input" name="game-ownership-status">
              <option value="" disabled>Select ownership status</option>
              <option value="In Collection">In Collection</option>
              <option value="Borrowed">Borrowed</option>
              <option value="Lent Out">Lent to Someone</option>
              <option value="Sold">Sold</option>
            </select>
          </div>
        </div>

        <!-- Purchase Date Input -->
        <div class="row mb-3">
          <div class="col-12 col-sm-4">
            <label for="game-purchase-date-input" class="form-label">Purchase Date</label>
          </div>
          <div class="col-12 col-sm-8">
            <input id="game-purchase-date-input" type="date" class="form-control">
          </div>
        </div>

        <!-- Price Input -->
        <div class="row mb-3">
          <div class="col-12 col-sm-4">
            <label for="game-price-input" class="form-label">Price</label>
          </div>
          <div class="col-12 col-sm-8">
            <div class="input-group">
              <span class="input-group-text" id="price-currency"></span>
              <input id="game-price-input" type="number" class="form-control">
            </div>
          </div>
        </div>

        <!-- Note Input -->
        <div class="row mb-3">
          <div class="col-12 col-sm-4">
            <label for="game-note-input" class="form-label">Note</label>
          </div>
          <div class="col-12 col-sm-8">
            <textarea id="game-note-input" class="form-control" rows="3"></textarea>
          </div>
        </div>

      </form>


      <div class="row justify-content-between mb-3">
        <div class="col">
          <button class="btn btn-secondary" onclick="history.back()">
            <span class="bi bi-caret-left-fill"></span>Back to List
          </button>
        </div>

        <div class="col text-end">
          <button id="save-game-btn" class="btn btn-primary">
            <span class="bi bi-check-circle-fill me-2"></span>Save Changes
          </button>
        </div>
      </div>
  </section>
  `,

  setup(gameId) {
    const game = gamesStorage.game(gameId);

    const container = document.getElementById("game-details-container");
    const gameTitleElement = document.getElementById("game-title");
    const gameTitleInput = document.getElementById("game-title-input");
    const platformInput = document.getElementById("game-platform-input");
    const yearInput = document.getElementById("game-year-input");
    const regionInput = document.getElementById("game-region-input");
    const conditionInput = document.getElementById("game-condition-input");
    const statusInput = document.getElementById("game-status-input");
    const ownershipStatusInput = document.getElementById("game-ownership-status-input");
    const purchaseDateInput = document.getElementById("game-purchase-date-input");
    const priceInput = document.getElementById("game-price-input");
    const noteInput = document.getElementById("game-note-input");

    const currencySymbol = document.getElementById("price-currency");
    currencySymbol.textContent = config.getCurrency();

    if (game) {
      gameTitleElement.textContent = game.title;
      gameTitleInput.value = game.title;
      platformInput.value = game.platform || "";
      yearInput.value = game.year;
      regionInput.value = game.region || "";
      conditionInput.value = game.condition || "";
      statusInput.value = game.status || "";
      ownershipStatusInput.value = game.ownership || "";
      purchaseDateInput.value = game.purchase_date;
      priceInput.value = formatters.price(game.price);
      noteInput.value = game.note;
    } else {
      container.innerHTML = /* html */ `
        <div class="alert alert-danger text-center" role="alert">
          <span class="bi bi-exclamation-triangle-fill fs-1"></span>
          <h4>Game not found</h4>
          <p>The game you're looking for doesn't exist.</p>
          <button class="btn btn-secondary" onclick="history.back()">Go Back</button>
        </div>
      `;
      return;
    }
  },
};
