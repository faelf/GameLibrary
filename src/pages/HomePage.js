import HomePageHtml from "../html/home.html?raw";
import { stats } from "../data/stats.js";
import * as config from "../utils/config.js";
import * as storages from "../utils/storages.js";

export const HomePage = {
  title: "Dashboard",
  html: HomePageHtml,
  async setup() {
    const greetingText = document.getElementById("greeting");
    const firstName = config.getFirstName();
    greetingText.innerText = `Hello, ${firstName}!`;

    const gamesData = await storages.load(config.keys.games);

    const totalGamesEl = document.getElementById("total-games");
    const totalGames = stats.totalGames(gamesData);
    totalGamesEl.innerText = `${totalGames}`;

    const totalSpentEl = document.getElementById("total-spent");
    const totalSpent = stats.totalSpent(gamesData);
    totalSpentEl.innerText = `${config.formatFullPrice(totalSpent)}`;

    const completedGamesTotal = stats.completedGames(gamesData);
    const completedGamesTotalEl = document.getElementById("completed-games");
    completedGamesTotalEl.innerText = `${completedGamesTotal}`;

    const currentlyPlayingGames = stats.currentlyPlaying(gamesData);
    const currentlyPlayingGamesEl = document.getElementById(
      "currently-playing-games",
    );
    currentlyPlayingGamesEl.innerText = `${currentlyPlayingGames}`;

    const backlogGamesEl = document.getElementById("backlog-games");
    const backlogGames = stats.backlogGames(gamesData);
    backlogGamesEl.innerText = `${backlogGames}`;

    const totalPlatformsEl = document.getElementById("total-platforms");
    const totalPlatforms = stats.totalConsoles(gamesData);
    totalPlatformsEl.innerText = `${totalPlatforms}`;
  },
};
