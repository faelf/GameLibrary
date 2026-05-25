/**
 * Defines the structure for a single form field's configuration.
 * @typedef { Object } FieldConfig
 * @property { string } component - HTML form control.
 * @property { string } [ inputType ] - HTML type (e.g., 'text', 'number'). Default text.
 * @property { string } inputId - The unique DOM ID for the input.
 * @property { string } labelText - The friendly label displayed to the user.
 * @property { string } placeholder - Helper text inside the input.
 * @property { Object.<string, string> } [ list ] - Optional key/value pairs for Select/Radio options.
 */
/**
 * Object containing configuration for all game form fields.
 * @typedef { Object } GameConfig
 * @property { FieldConfig } title - Configuration for the Game Title input.
 * @property { FieldConfig } platform - Configuration for the Platform select menu.
 * @property { FieldConfig } releaseyear - Configuration for the Release Year input.
 * @property { FieldConfig } region - Configuration for the Region select/radio.
 * @property { FieldConfig } condition - Configuration for the Condition radio group.
 * @property { FieldConfig } status - Configuration for the Play Status (e.g., Beaten/Backlog).
 * @property { FieldConfig } price - Configuration for the Price input.
 * @property { FieldConfig } purchaseDate - Configuration for the Purchase Date picker.
 * @property { FieldConfig } ownership - Configuration for the Ownership toggle/radio.
 * @property { FieldConfig } note - Configuration for the Notes text area.
 */
export const gameSchema = {
  title: {
    component: "input",
    inputType: "text",
    inputId: "title",
    labelText: "Title",
    placeholder: "Enter the game title",
  },
  platform: {
    component: "select",
    inputId: "platform",
    labelText: "Console",
    placeholder: "Select a console",
    list: {
      NES: "Nintendo Entertainment System",
      SNES: "Super Nintendo",
      N64: "Nintendo 64",
      GCN: "Nintendo GameCube",
      WII: "Nintendo Wii",
      WIIU: "Nintendo Wii U",
      NS: "Nintendo Switch",
      NS2: "Nintendo Switch 2",
      GB: "Game Boy",
      GBC: "Game Boy Color",
      GBA: "Game Boy Advance",
      NDS: "Nintendo DS",
      N3DS: "Nintendo 3DS",
      PC: "PC",
      STEAM: "Steam",
    },
  },
  "release-year": {
    component: "input",
    inputType: "text",
    inputId: "release-year",
    labelText: "Release Year",
    placeholder: "Format YYYY",
  },
  region: {
    component: "select",
    inputId: "region",
    labelText: "Region",
    placeholder: "Select a region",
    list: {
      JP: "Japan",
      NA: "North America",
      EU: "Europe",
      UK: "UK",
      FR: "France",
      DE: "Germany",
      REGIONFREE: "Region Free",
    },
  },
  condition: {
    component: "select",
    inputId: "condition",
    labelText: "Condition",
    placeholder: "Select a condition",
    list: {
      SEALED: "Sealed",
      COLLECTORSEDITION: "Collector's Edition",
      CIB: "Complete in box",
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
    inputId: "status",
    labelText: "Status",
    placeholder: "Select a status",
    list: {
      NOTSTARTED: "Not started",
      PLAYING: "Playing",
      COMPLETED: "Completed",
      BACKLOG: "Backlog",
      PRETTY: "Beautifying my shelf",
    },
  },
  "price-paid": {
    component: "input-group",
    inputType: "number",
    inputId: "price-paid",
    labelText: "Price Paid",
    placeholder: "0.00",
  },
  "purchase-date": {
    component: "input",
    inputType: "date",
    labelText: "Purchase Date",
    inputId: "purchase-date",
    placeholder: "Enter the game purchase date",
  },
  "ownership-status": {
    component: "select",
    inputId: "ownership-status",
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
    inputId: "note",
    labelText: "Note",
    placeholder: "Write a note",
  },
};
