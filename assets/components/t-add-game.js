import { config } from "../data/config.js";
import { gamesStorage } from "../data/games-storage.js";

class TAddGame extends HTMLElement {
  connectedCallback() {
    const currency = config.getCurrency();

    this.innerHTML = /* html */ `

<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add-game">
  <span class="bi bi-plus-circle-fill"></span> Game
</button>

<!-- Modal -->
<div class="modal fade" id="add-game" tabindex="-1"
     data-bs-backdrop="static"
     data-bs-keyboard="false"
     aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">

      <div class="modal-header">
        <h1 class="modal-title fs-5">
          <span class="bi bi-controller"></span> Add Game
        </h1>
      </div>

      <form id="add-game-form">
        <div class="modal-body">
          <div class="row">
            <!-- Game Title -->
            <div class="col-12 mb-3">
              <label for="game-title" class="form-label">Game Title</label>
              <input type="text" class="form-control" id="game-title" required>
            </div>
            <!-- Game Platform -->
            <div class="col-sm-6 col-xl-4 mb-3">
              <label class="form-label" for="game-platform">Platform</label>
              <select class="form-select" id="game-platform" name="game-platform" required>
                <option value="" selected disabled>Select a platform</option>
                <option value="Nintendo">Nintendo</option>
                <option value="Super Nintendo">Super Nintendo</option>
                <option value="Nintendo 64">Nintendo 64</option>
                <option value="GameCube">GameCube</option>
                <option value="Wii">Wii</option>
                <option value="Nintendo Switch">Nintendo Switch</option>
                <option value="Nintendo Switch 2">Nintendo Switch 2</option>
                <option value="PC">PC</option>
                <option value="Game Boy">Game Boy</option>
                <option value="Game Boy Color">Game Boy Color</option>
                <option value="Game Boy Advance">Game Boy Advance</option>
                <option value="Nintendo DS">Nintendo DS</option>
                <option value="Nintendo 3DS">Nintendo 3DS</option>
              </select>
            </div>
            <!-- Game Status -->
            <div class="col-sm-6 col-xl-4 mb-3">
              <label class="form-label" for="game-status">Status</label>
              <select class="form-select" id="game-status" name="game-status" required>
                <option value="" selected disabled>Status</option>
                <option value="Not started">Not started</option>
                <option value="Playing">Playing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <!-- Game Ownership Status -->
            <div class="col-sm-6 col-xl-4 mb-3">
              <label class="form-label" for="game-ownership-status">Ownership Status</label>
              <select class="form-select" id="game-ownership-status" name="game-ownership-status" required>
                <option value="" selected disabled>Select ownership status</option>
                <option value="In Collection">In Collection</option>
                <option value="Borrowed">Borrowed</option>
                <option value="Lent Out">Lent to Someone</option>
                <option value="Sold">Sold</option>
              </select>
            </div>
            <!-- Game Region -->
            <div class="col-sm-6 col-xl-4 mb-3">
              <label class="form-label" for="game-region">Region</label>
              <select class="form-select" id="game-region" name="game-region">
                <option value="" selected disabled>Select region</option>
                <option value="PAL">PAL</option>
                <option value="PAL UK">PAL UK</option>
                <option value="PAL FR">PAL FR</option>
                <option value="PAL DE">PAL DE</option>
                <option value="NTSC-U">NTSC-U</option>
                <option value="NTSC-J">NTSC-J</option>
                <option value="NTSC-K">NTSC-K</option>
                <option value="Region Free">Region Free</option>
              </select>
            </div>
            <!-- Game Year -->
            <div class="col-sm-6 col-md-4 mb-3">
              <label for="game-year" class="form-label">Year</label>
              <input type="text" class="form-control" id="game-year">
            </div>
            <!-- Game Purchase Date -->
            <div class="col-sm-6 col-md-4 mb-3">
              <label for="game-purchase-date" class="form-label">Purchase Date</label>
              <input type="date" class="form-control" id="game-purchase-date">
            </div>
            <!-- Game Price -->
            <div class="col-sm-6 col-md-4 mb-3">
              <label for="game-price" class="form-label">Price</label>
              <div class="input-group">
                <span class="input-group-text">${currency}</span>
                <input type="text" class="form-control" id="game-price" required>
              </div>
            </div>
            <!-- Game Format -->
            <div class="col-sm-6 col-xl-4 mb-3">
              <label class="form-label" for="game-format">Format</label>
              <select class="form-select" id="game-format" name="game-format">
                <option value="" selected disabled>Select a format</option>
                <option value="Physical">Physical</option>
                <option value="Digital">Digital</option>
              </select>
            </div>
            <!-- Game Condition -->
            <div class="col-sm-6 col-xl-4 mb-3">
              <label class="form-label" for="game-condition">Condition</label>
              <select class="form-select" id="game-condition" name="game-condition">
                <option value="" selected disabled>Select a condition</option>
                <option value="Sealed">Sealed</option>
                <option value="CIB">Complete in Box (CIB)</option>
                <option value="Box & Game">Box & Game</option>
                <option value="Game & Manual">Game & Manual</option>
                <option value="Loose">Game Only / Cartridge Only (Loose)</option>
                <option value="Digital">Digital Copy</option>
              </select>
            </div>
            <!-- Game Note -->
            <div class="col-12 mb-3">
              <label for="game-note" class="form-label">Note</label>
              <textarea class="form-control" id="game-note" rows="3"></textarea>
            </div>

          </div>
        </div>


        <div class="modal-footer">
          <button id="add-game-btn" type="button" class="btn btn-success">
            <span class="bi bi-plus-circle-fill"></span> Add Game
          </button>
          <button type="reset" class="btn btn-warning">
            <span class="bi bi-eraser-fill"></span> Clear
          </button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            <span class="bi bi-x-circle-fill"></span> Close
          </button>
        </div>

      </form>
    </div>
  </div>
</div>

   `;

    // Loads games from local storage
    const form = document.getElementById("add-game-form");
    const addGameBtn = document.getElementById("add-game-btn");

    function addGame() {
      const gameTitle = document.getElementById("game-title").value;
      const gamePlatform = document.getElementById("game-platform").value;
      const gameStatus = document.getElementById("game-status").value;
      const gameYear = document.getElementById("game-year").value;
      const gamePurchaseDate =
        document.getElementById("game-purchase-date").value;
      const gamePrice = document.getElementById("game-price").value;
      const gameRegion = document.getElementById("game-region").value;
      const gameNote = document.getElementById("game-note").value;
      const gameFormat = document.getElementById("game-format").value;
      const gameCondition = document.getElementById("game-condition").value;
      const gameOwnershipStatus = document.getElementById(
        "game-ownership-status"
      ).value;

      // Create new game object
      const newGame = {
        id: Date.now(),
        title: gameTitle,
        platform: gamePlatform,
        year: gameYear,
        region: gameRegion,
        condition: gameCondition,
        format: gameFormat,
        status: gameStatus,
        ownershipStatus: gameOwnershipStatus,
        purchase_date: gamePurchaseDate,
        price: parseFloat(gamePrice).toFixed(2),
        note: gameNote,
      };

      // Load fresh games from localStorage
      const games = gamesStorage.load();

      // Push new game to the array
      games.push(newGame);

      // Save updated array to localStorage
      gamesStorage.save(games);

      // Close the modal
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("add-game")
      );
      modal.hide();

      // Clear the form
      form.reset();

      // Reload page
      window.location.reload();
    }

    addGameBtn.addEventListener("click", addGame);
  }
}

customElements.define("t-add-game-btn", TAddGame);
