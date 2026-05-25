export const stats = {
  totalGames(data) {
    const safeData = data || [];
    let total = safeData.length;
    return total;
  },

  completedGames(data) {
    const safeData = data || [];
    let completed = safeData.filter((game) => game.status === "Completed");
    completed = completed.length;
    return completed;
  },

  totalSpent(data) {
    const safeData = data || [];
    let spent = safeData.reduce(
      (sum, game) => sum + Number(game["price-paid"] || 0),
      0,
    );
    return spent;
  },

  currentlyPlaying(data) {
    const safeData = data || [];
    let playing = safeData.filter((game) => game.status === "Playing");
    playing = playing.length;
    return playing;
  },

  backlogGames(data) {
    const safeData = data || [];
    let backlog = safeData.filter((game) => game.status === "Not started");
    backlog = backlog.length;
    return backlog;
  },

  totalConsoles(data) {
    const safeData = data || [];
    let platforms = new Set(safeData.map((game) => game.platform));
    platforms = platforms.size;
    return platforms;
  },
};
