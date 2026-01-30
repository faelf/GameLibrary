import { config } from "../utils/config.js";
import { formatters } from "../utils/formatters.js";
import { stats } from "../data/stats.js";

export const HomePage = {
  title: "Dashboard",
  html: "home.html",
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
    const currentlyPlayingGamesEl = document.getElementById(
      "currently-playing-games",
    );
    currentlyPlayingGamesEl.innerText = `${currentlyPlayingGames}`;

    const backlogGamesEl = document.getElementById("backlog-games");
    const backlogGames = stats.backlogGames();
    backlogGamesEl.innerText = `${backlogGames}`;

    const totalPlatformsEl = document.getElementById("total-platforms");
    const totalPlatforms = stats.totalConsoles();
    totalPlatformsEl.innerText = `${totalPlatforms}`;
  },
};
