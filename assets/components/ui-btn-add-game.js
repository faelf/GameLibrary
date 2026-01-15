import { config } from "../utils/config.js";
import { form } from "../utils/forms.js";
import { gameSchema } from "../data/game-schema.js";

class UIAddGame extends HTMLElement {
  connectedCallback() {
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
            <h2 class="modal-title">
              <span class="bi bi-controller"></span> Add Game
            </h2>
          </div>

          <form id="add-game-form">
            <div class="modal-body">
              <div id="form-row" class="row text-start">
                <!-- Form is added here -->
              </div>
            </div>

            <div class="modal-footer">
              <button id="add-game-btn" type="button" class="btn btn-success">
                <span class="bi bi-check-circle-fill"></span> Save
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

    form.render("form-row", gameSchema, layoutMap, options);
  }
}

customElements.define("ui-btn-add-game", UIAddGame);
