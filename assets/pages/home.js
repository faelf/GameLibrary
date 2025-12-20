import { config } from "../data/config.js";

export const homePage = {
  title: "Dashboard",
  html: /* html */ `
<section class="m-2">
  <h2 id="greeting"></h2>
  <p class="lead">Welcome to your Game Collection App!</p>

  <div class="row">
    <div class="col-sm-6 col-xxl-3">
      <div class="card text-white bg-primary mb-3">
        <div class="card-body d-flex align-items-center justify-content-center">
          <!-- Icon Column -->
          <div class="me-3 display-3">
            <span class="bi bi-dpad-fill"></span>
          </div>
          <!-- Text Column -->
          <div>
            <h5 class="card-title mb-1">Total Games</h5>
            <p id="total-games" class="display-5 mb-0">0</p>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-6 col-xxl-3">
      <div class="card text-white bg-primary mb-3">
        <div class="card-body d-flex align-items-center justify-content-center">
          <!-- Icon Column -->
          <div class="me-3 display-3">
            <span class="bi bi-controller"></span>
          </div>
          <!-- Text Column -->
          <div>
            <h5 class="card-title mb-1">Games Completed</h5>
            <p id="total-games" class="display-5 mb-0">0</p>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-6 col-xxl-3">
      <div class="card text-white bg-success mb-3">
        <div class="card-body d-flex align-items-center justify-content-center">
          <div class="me-3 display-3">
            <span class="bi bi-piggy-bank-fill"></span>
          </div>
          <div>
            <h5 class="card-title mb-1">Total Spent</h5>
            <p id="total-spent" class="display-5 mb-0">£0.00</p>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-6 col-xxl-3">
      <div class="card text-white bg-success mb-3">
        <div class="card-body d-flex align-items-center justify-content-center">
          <div class="me-3 display-3">
            <span class="bi bi-nintendo-switch"></span>
          </div>
          <div>
            <h5 class="card-title mb-1">Total Platforms</h5>
            <p id="total-spent" class="display-5 mb-0">0</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</section>

  `,
  setup() {
    const greetingText = document.getElementById("greeting");
    const firstName = config.getFirstName();
    greetingText.innerText = `Hello, ${firstName}!`;
  },
};
