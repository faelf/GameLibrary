import { storages } from "../utils/storages.js";
import { config } from "../utils/config.js";

export const stats = {
  data: storages.load(config.keys.games),
  totalGames() {
    let total = this.data.length;
    return total;
  },

  completedGames() {
    let completed = this.data.filter((game) => game.status === "Completed");
    completed = completed.length;
    return completed;
  },

  totalSpent() {
    let spent = this.data.reduce((sum, game) => sum + Number(game.price || 0), 0);
    return spent;
  },

  currentlyPlaying() {
    let playing = this.data.filter((game) => game.status === "Playing");
    playing = playing.length;
    return playing;
  },

  backlogGames() {
    let backlog = this.data.filter((game) => game.status === "Not started");
    backlog = backlog.length;
    return backlog;
  },

  totalConsoles() {
    let platforms = new Set(this.data.map((game) => game.platform));
    platforms = platforms.size;
    return platforms;
  },
};
