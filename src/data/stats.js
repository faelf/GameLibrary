export const stats = {
  totalGames(data) {
    let total = data.length;
    return total;
  },

  completedGames(data) {
    let completed = data.filter((game) => game.status === "Completed");
    completed = completed.length;
    return completed;
  },

  totalSpent(data) {
    let spent = data.reduce((sum, game) => sum + Number(game.price || 0), 0);
    return spent;
  },

  currentlyPlaying(data) {
    let playing = data.filter((game) => game.status === "Playing");
    playing = playing.length;
    return playing;
  },

  backlogGames(data) {
    let backlog = data.filter((game) => game.status === "Not started");
    backlog = backlog.length;
    return backlog;
  },

  totalConsoles(data) {
    let platforms = new Set(data.map((game) => game.platform));
    platforms = platforms.size;
    return platforms;
  },
};
