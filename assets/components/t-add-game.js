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
            <div class="col-12 mb-3">
              <label for="game-title" class="form-label">Game Title</label>
              <input type="text" class="form-control" id="game-title" required>
            </div>
            <div class="col-6 mb-3">
              <label class="form-label" for="platform">Platform</label>
              <select class="form-select" id="platform" name="platform" required>
                <option value="" selected disabled>Select a platform</option>
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
              </select>
            </div>
            <div class="col-6 mb-3">
              <label class="form-label" for="status">Status</label>
              <select class="form-select" id="status" name="status" required>
                <option value="" selected disabled>Status</option>
                <option value="Not started">Not started</option>
                <option value="Playing">Playing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div class="col-4 mb-3">
              <label for="game-year" class="form-label">Year</label>
              <input type="text" class="form-control" id="game-year">
            </div>
            <div class="col-4 mb-3">
              <label for="game-purchase-date" class="form-label">Purchase Date</label>
              <input type="date" class="form-control" id="game-purchase-date">
            </div>
            <div class="col-4 mb-3">
              <label for="game-price" class="form-label">Price</label>
              <div class="input-group">
                <span class="input-group-text" id="basic-addon3">${currency}</span>
                <input type="text" step="0.01" class="form-control" id="game-price" required>
              </div>
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
    const games = gamesStorage.load();
    const addGameBtn = document.getElementById("add-game-btn");

    function addGame() {
      const gameTitle = document.getElementById("game-title").value;
      const platform = document.getElementById("platform").value;
      const status = document.getElementById("status").value;
      const year = document.getElementById("game-year").value;
      const purchaseDate = document.getElementById("game-purchase-date").value;
      const price = document.getElementById("game-price").value;

      // Create new game object
      const newGame = {
        id: Date.now(),
        name: gameTitle, // String
        platform: platform, // String
        status: status, // String
        year: year, // String
        purchase_date: purchaseDate, // String
        price: parseFloat(price).toFixed(2), // Float
      };

      // Pushes new game to the array
      games.push(newGame);

      // Updates the array on Local Storage
      gamesStorage.save(games);

      // Close the modal
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("add-game")
      );
      modal.hide();
    }

    addGameBtn.addEventListener("click", addGame);
  }
}

customElements.define("t-add-game", TAddGame);
