import { config } from "../utils/config.js";
import { formatters } from "../utils/formatters.js";
import { stats } from "../data/stats.js";

export const homePage = {
  title: "Dashboard",
  html: /* html */ `
  <section class="m-2">
    <h2 id="greeting"></h2>
    <p class="lead">Welcome to your Game Collection App!</p>

    <div class="row g-3">
      <!-- Total Games -->
      <div class="col-md-6 col-xxl-4">
        <div class="card bg-primary h-100">
          <div class="card-body d-flex align-items-center text-dark">
            <div class="me-3 display-3">
              <span class="bi bi-dpad-fill"></span>
            </div>
            <div class="text-center flex-grow-1">
              <h5 class="card-title mb-1">Total Games</h5>
              <p id="total-games" class="display-5 mb-0">0</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Games Completed -->
      <div class="col-md-6 col-xxl-4">
        <div class="card bg-success h-100">
          <div class="card-body d-flex align-items-center text-dark">
            <div class="me-3 display-3">
              <span class="bi bi-check-circle-fill"></span>
            </div>
            <div class="text-center flex-grow-1">
              <h5 class="card-title mb-1">Games Completed</h5>
              <p id="completed-games" class="display-5 mb-0">0</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Currently Playing -->
      <div class="col-md-6 col-xxl-4">
        <div class="card bg-info h-100">
          <div class="card-body d-flex align-items-center text-dark">
            <div class="me-3 display-3">
              <span class="bi bi-play-circle-fill"></span>
            </div>
            <div class="text-center flex-grow-1">
              <h5 class="card-title mb-1">Currently Playing</h5>
              <p id="currently-playing-games" class="display-5 mb-0">0</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Backlog -->
      <div class="col-md-6 col-xxl-4">
        <div class="card bg-warning h-100">
          <div class="card-body d-flex align-items-center text-dark">
            <div class="me-3 display-3">
              <span class="bi bi-clock-fill"></span>
            </div>
            <div class="text-center flex-grow-1">
              <h5 class="card-title mb-1">Backlog</h5>
              <p id="backlog-games" class="display-5 mb-0">0</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Total Spent -->
      <div class="col-md-6 col-xxl-4">
        <div class="card bg-danger h-100">
          <div class="card-body d-flex align-items-center text-dark">
            <div class="me-3 display-3">
              <span class="bi bi-piggy-bank-fill"></span>
            </div>
            <div class="text-center flex-grow-1">
              <h5 class="card-title mb-1">Total Spent</h5>
              <p id="total-spent" class="display-5 mb-0">£0.00</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Total Platforms -->
      <div class="col-md-6 col-xxl-4">
        <div class="card bg-secondary h-100">
          <div class="card-body d-flex align-items-center text-dark">
            <div class="me-3 display-3">
              <span class="bi bi-nintendo-switch"></span>
            </div>
            <div class="text-center flex-grow-1">
              <h5 class="card-title mb-1">Total Platforms</h5>
              <p id="total-platforms" class="display-5 mb-0">0</p>
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

    const totalGamesEl = document.getElementById("total-games");
    const totalGames = stats.totalGames();
    totalGamesEl.innerText = `${totalGames}`;

    const totalSpentEl = document.getElementById("total-spent");
    const totalSpent = stats.totalSpent();
    totalSpentEl.innerText = `${formatters.fullPrice(totalSpent)}`;

    const completedGamesTotal = stats.completedGames();
    const completedGamesTotalEl = document.getElementById("completed-games");
    completedGamesTotalEl.innerText = `${completedGamesTotal}`;

    const currentlyPlayingGames = stats.currentlyPlaying();
    const currentlyPlayingGamesEl = document.getElementById("currently-playing-games");
    currentlyPlayingGamesEl.innerText = `${currentlyPlayingGames}`;

    const backlogGamesEl = document.getElementById("backlog-games");
    const backlogGames = stats.backlogGames();
    backlogGamesEl.innerText = `${backlogGames}`;

    const totalPlatformsEl = document.getElementById("total-platforms");
    const totalPlatforms = stats.totalConsoles();
    totalPlatformsEl.innerText = `${totalPlatforms}`;
  },
};
