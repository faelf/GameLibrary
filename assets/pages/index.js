// Import pages
import { homePage } from "./home.js";
import { gamesListPage } from "./games-list.js";
import { settingsPage } from "./settings.js";
import { gameDetailsPage } from "./game-details.js";

// Combine all pages into the pageContent object
export const pageContent = {
  "dashboard-page": homePage,
  "games-list-page": gamesListPage,
  "settings-page": settingsPage,
  "game-details-page": gameDetailsPage,
};
