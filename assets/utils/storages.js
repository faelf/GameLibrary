/**
 * A generic storage utility that works with any key in localStorage.
 * Provides methods to load, save, add, get, update, remove, and check items.
 * @module utils/storages.js
 */
export const storages = {
  /**
   * Load all items from a given key in localStorage.
   *
   * @param {string} key - The key in localStorage to load items from.
   * @returns {Array<Object>} An array of objects stored under the key, or an empty array if none.
   * @example
   * const allGames = storages.load("games");
   */
  load(key) {
    const storedData = localStorage.getItem(key);

    if (storedData) {
      return JSON.parse(storedData);
    } else {
      return [];
    }
  },

  /**
   * Save an array of items to a given key in localStorage.
   *
   * @param {string} key - The key in localStorage to save items under.
   * @param {Array<Object>} values - An array of objects to store.
   * @example
   */
  save(key, values) {
    localStorage.setItem(key, JSON.stringify(values));
  },

  /**
   * Add a new item to storage under a given key.
   * Generates a unique `id` automatically for the new item.
   * @param {string} key - The key in localStorage to save the item under.
   * @param {Object} item - The item object to add.
   * @returns {Object} The newly created item (with the generated id).
   * @example
   * const newGame = storages.add("games", { title: "Pokemon", platform: "Gameboy" });
   */
  add(key, item) {
    const items = this.load(key);
    const newItem = {
      id: String(Date.now() + Math.floor(Math.random() * 1000)),
      ...item,
    };
    items.push(newItem);
    this.save(key, items);
    return newItem;
  },

  /**
   * Get a single item from storage by key and item ID.
   *
   * @param {string} key - The key in localStorage to load from.
   * @param {string} itemId - The ID of the item to retrieve.
   * @returns {Object|undefined} The item object if found, otherwise undefined.
   * @example
   * const game = storages.get("games", "1709823456789");
   */
  get(key, itemId) {
    const items = this.load(key);

    return items.find(function (item) {
      return item.id == itemId;
    });
  },

  /**
   * Update an existing item in storage by key and item ID.
   *
   * @param {string} key - The key in localStorage to update.
   * @param {string} itemId - The ID of the item to update.
   * @param {Object} updates - An object containing properties to update.
   * @returns {boolean} True if the item was found and updated, false if not found.
   * @example
   * const updated = storages.update("games", "1709823456789", { status: "Completed" });
   */
  update(key, itemId, updates) {
    const items = this.load(key);
    const itemIndex = items.findIndex(function (item) {
      return item.id == itemId;
    });
    if (itemIndex === -1) {
      return false;
    }
    items[itemIndex] = {
      ...items[itemIndex],
      ...updates,
    };
    this.save(key, items);
    return true;
  },

  /**
   * Remove an item from storage by key and item ID.
   *
   * @param {string} key - The key in localStorage to remove from.
   * @param {string} itemId - The ID of the item to remove.
   * @example
   * storages.remove("games", "1709823456789");
   */
  remove(key, itemId) {
    const filteredItems = this.load(key).filter(function (item) {
      return item.id != itemId;
    });
    this.save(key, filteredItems);
  },

  /**
   * Check if an item exists in storage by key and item ID.
   *
   * @param {string} key - The key in localStorage to check.
   * @param {string} itemId - The ID of the item to check.
   * @returns {boolean} True if the item exists, false otherwise.
   * @example
   * const exists = storages.exists("games", "1709823456789");
   */
  exists(key, itemId) {
    return Boolean(this.get(key, itemId));
  },
};
