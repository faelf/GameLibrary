// Import pages
import { HomePage } from "./HomePage.js";
import { GamesListPage } from "./GamesListPage.js";
import { SettingsPage } from "./SettingsPage.js";
import { GameDetailsPage } from "./GameDetailsPage.js";

// Combine all pages into the pageContent object
export const pageContent = {
  "dashboard-page": HomePage,
  "games-list-page": GamesListPage,
  "settings-page": SettingsPage,
  "game-details-page": GameDetailsPage,
};
