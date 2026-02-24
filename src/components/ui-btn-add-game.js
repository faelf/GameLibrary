import { config } from "../utils/config.js";
import { form } from "../utils/forms.js";
import { gameSchema } from "../data/game-schema.js";
import { storages } from "../utils/storages.js";

class UIAddGame extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */ `
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#add-game">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg-md me-2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 12h8"/>
        <path d="M12 8v8"/>
      </svg>  
      Add Game
    </button>

    <!-- Modal -->
    <div class="modal fade" id="add-game" tabindex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">

          <div class="modal-header p-2 px-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  class="svg-lg me-2">
          <path d="M11.146 15.854a1.207 1.207 0 0 1 1.708 0l1.56 1.56A2 2 0 0 1 15 18.828V21a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2.172a2 2 0 0 1 .586-1.414z"/>
          <path d="M18.828 15a2 2 0 0 1-1.414-.586l-1.56-1.56a1.207 1.207 0 0 1 0-1.708l1.56-1.56A2 2 0 0 1 18.828 9H21a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1z"/>
          <path d="M6.586 14.414A2 2 0 0 1 5.172 15H3a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h2.172a2 2 0 0 1 1.414.586l1.56 1.56a1.207 1.207 0 0 1 0 1.708z"/>
          <path d="M9 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2.172a2 2 0 0 1-.586 1.414l-1.56 1.56a1.207 1.207 0 0 1-1.708 0l-1.56-1.56A2 2 0 0 1 9 5.172z"/>
          </svg>
          <h2 class="modal-title">New Game</h2>
          </div>

          <form id="add-game-form">
          
            <div class="modal-body">
              <div id="form-row" class="row">
                <!-- Form is added here -->
              </div>
            </div>

            <div class="modal-footer">
              <button id="add-game-btn" type="button" class="btn btn-success">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg-md me-2">
                <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/>
                <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/>
                <path d="M7 3v4a1 1 0 0 0 1 1h7"/>
                </svg>
                Save
              </button>
              <button type="reset" class="btn btn-warning">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg-md me-2">
                <path d="M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21"/>
                <path d="m5.082 11.09 8.828 8.828"/>
                </svg>
                Clear
              </button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg-md me-2">
                <path d="M18 6 6 18"/>
                <path d="m6 6 12 12"/>
                </svg>
                 Close
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
    `;

    // Load form
    const layoutMap = {
      title: "col-12",
      platform: "col-lg-6",
      year: "col-lg-6",
      region: "col-lg-6",
      condition: "col-lg-6",
      status: "col-lg-6",
      price: "col-lg-6",
      purchaseDate: "col-lg-6",
      ownership: "col-lg-6",
      note: "col-12",
    };

    const currency = config.getCurrency();
    const options = {
      rows: 1,
      inputGroupText: currency,
    };

    form.render({
      containerId: "form-row",
      schema: gameSchema,
      layoutMap,
      options,
    });

    const modalElement = document.getElementById("add-game");
    const addBtn = document.getElementById("add-game-btn");

    addBtn.addEventListener("click", function () {
      const newGame = form.getFormData(gameSchema);
      newGame.id = Date.now();
      storages.add(config.keys.games, newGame);
      const modal = bootstrap.Modal.getInstance(modalElement);
      document.dispatchEvent(new CustomEvent("game-added"));
      if (modal) modal.hide();
    });
  }
}

customElements.define("ui-btn-add-game", UIAddGame);
