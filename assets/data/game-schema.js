/**
 * Defines the structure for a single form field's configuration.
 * @typedef {Object} FieldConfig
 * @property {string} inputId - The unique DOM ID for the input.
 * @property {string} labelText - The friendly label displayed to the user.
 * @property {string} [inputType] - HTML type (e.g., 'text', 'number'). Optional for selects.
 * @property {string} [placeholder] - Helper text inside the input.
 * @property {Object.<string, string>} [list] - Optional key/value pairs for Select/Radio options.
 */
/**
 * Object containing configuration for all game form fields.
 * @typedef {Object} GameConfig
 * @property {FieldConfig} title - Configuration for the Game Title input.
 * @property {FieldConfig} platform - Configuration for the Platform select menu.
 * @property {FieldConfig} year - Configuration for the Release Year input.
 * @property {FieldConfig} region - Configuration for the Region select/radio.
 * @property {FieldConfig} condition - Configuration for the Condition radio group.
 * @property {FieldConfig} status - Configuration for the Play Status (e.g., Beaten/Backlog).
 * @property {FieldConfig} price - Configuration for the Price input.
 * @property {FieldConfig} purchaseDate - Configuration for the Purchase Date picker.
 * @property {FieldConfig} ownership - Configuration for the Ownership toggle/radio.
 * @property {FieldConfig} note - Configuration for the Notes text area.
 */
export const gameSchema = {
  title: {
    component: "input",
    inputId: "game-title-input",
    labelText: "Game Title",
    inputType: "text",
    placeholder: "Enter the game title",
  },
  platform: {
    component: "select",
    inputId: "game-platform-input",
    labelText: "Game Console",
    placeholder: "Select a console",
    list: {
      NES: "Nintendo Entertainment System",
      SNES: "Super Nintendo",
      N64: "Nintendo 64",
      GCN: "Nintendo GameCube",
      Wii: "Nintendo Wii",
      WiiU: "Nintendo Wii U",
      Switch: "Nintendo Switch",
      Switch2: "Nintendo Switch 2",
      GB: "Game Boy",
      GBC: "Game Boy Color",
      GBA: "Game Boy Advance",
      NDS: "Nintendo DS",
      N3DS: "Nintendo 3DS",
      PC: "PC",
      Steam: "Steam",
    },
  },
  year: {
    component: "input",
    inputId: "game-year-input",
    labelText: "Game Release Year",
    inputType: "number",
    placeholder: "Format YYYY",
  },
  region: {
    component: "select",
    inputId: "game-region-input",
    labelText: "Game Region",
    placeholder: "Select a region",
    list: {
      JPN: "Japan",
      USA: "North America",
      EUR: "Europe",
      UK: "UK",
      FRA: "France",
      GER: "Germany",
      REGIONFREE: "Region Free",
    },
  },
  condition: {
    component: "select",
    inputId: "game-condition-input",
    labelText: "Game Condition",
    placeholder: "Select a condition",
    list: {
      SEALED: "Sealed",
      COLLECTORS: "Collector's Edition",
      CIB: "CIB",
      GAMEBOX: "Game and box",
      GAMEMANUAL: "Game and manual",
      GAMEONLY: "Game only",
      BOXMANUAL: "Box and manual",
      BOXONLY: "Box only",
      MANUALONLY: "Manual only",
      DIGITAL: "Digital",
    },
  },
  status: {
    component: "select",
    inputId: "game-status-input",
    labelText: "Game Status",
    placeholder: "Select a status",
    list: {
      NOTSTARTED: "Not started",
      PLAYING: "Playing",
      COMPLETED: "Completed",
    },
  },
  price: {
    component: "input-group",
    inputId: "game-price",
    labelText: "Price Paid",
    inputType: "number",
    placeholder: "0.00",
  },
  purchaseDate: {
    component: "input",
    labelText: "Game Purchase Date",
    inputId: "game-purchase-date",
    inputType: "date",
    placeholder: "Enter the game purchase date",
  },
  ownership: {
    component: "select",
    inputId: "game-ownership-status-input",
    labelText: "Ownership Status",
    placeholder: "Where is the game",
    list: {
      INCOLLECTION: "In Collection",
      BORROWED: "Borrowed",
      LENTOUT: "Lent Out",
      SOLD: "Sold",
    },
  },
  note: {
    component: "textarea",
    inputId: "game-note-input",
    labelText: "Note",
    placeholder: "Write a note",
  },
};
