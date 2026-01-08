/**
 * games-storage.js
 * Handles loading and saving the game library to localStorage.
 * @module data/games-storage
 */
export const gamesStorage = {
  /**
   * Load all games from localStorage.
   * @returns { Array<Object> } An array of game objects.
   * @example
   * const games = gamesStorage.load();
   */
  load() {
    const stored = localStorage.getItem("game-library");

    if (stored) {
      return JSON.parse(stored);
    }

    return [];
  },
  /**
   * Save an array of games to localStorage.
   * @param { Array<Object> } games - The array of game objects to save.
   * @example
   * gamesStorage.save([
   *   { id: 1, title: "Game 1", platform: "PC", year: 2020 },
   *   { id: 2, title: "Game 2", platform: "Nintendo Switch", year: 2021 },
   * ]);
   */
  save(games) {
    localStorage.setItem("game-library", JSON.stringify(games));
  },
  /**
   * Get a single game by its ID.
   * @param { number } itemid - The ID of the game to retrieve.
   * @returns { Object|undefined } The game object if found, otherwise undefined.
   * @example
   * const game = gamesStorage.game(1);
   */
  game(itemid) {
    const games = this.load();
    return games.find(function (item) {
      return item.id === parseInt(itemid);
    });
  },
};
