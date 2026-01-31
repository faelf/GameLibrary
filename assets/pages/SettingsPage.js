import { csv } from "../utils/csv.js";
import { jsonFile } from "../utils/json.js";
import { storages } from "../utils/storages.js";
import { gameSchema } from "../data/game-schema.js";
import { countrySchema } from "../data/country-schema.js";
import { config } from "../utils/config.js";
import { toast } from "../utils/toast.js";

export const SettingsPage = {
  title: "Settings",
  html: "settings.html",
  setup() {
    // --- Data Loading (General) ----------------------------------------
    let gamesData = storages.load(config.keys.games);

    // --- Theme Settings ------------------------------------------------
    const themeSelect = document.getElementById("theme-select");

    // Init: Apply saved theme
    const currentTheme = config.getTheme();
    document.documentElement.setAttribute("data-bs-theme", currentTheme);
    themeSelect.value = currentTheme;

    // Action: Change theme
    themeSelect.addEventListener("change", (e) => {
      const newTheme = e.target.value;
      storages.save(config.keys.theme, newTheme);
      document.documentElement.setAttribute("data-bs-theme", newTheme);
      toast.success("Theme updated successfully!");
    });

    // --- Personal Information (First Name) -----------------------------
    const firstNameInput = document.getElementById("first-name");
    const firstNameBtn = document.getElementById("first-name-btn");

    // Init: Load saved name
    firstNameInput.value = config.getFirstName();

    // Action: Save name
    firstNameBtn.addEventListener("click", () => {
      const nameValue = firstNameInput.value;
      storages.save(config.keys.user.firstName, nameValue);
      toast.success("Name updated successfully!");
    });

    // --- Regional Settings (Country & Flag) ----------------------------
    const countryInput = document.getElementById("user-country");
    const flagSpan = document.getElementById("country-flag");

    // Init: Load saved country
    countryInput.value = config.getCountryCode();
    flagSpan.textContent = config.getCountryFlag(); // Assuming this helper exists

    // Action: Change country
    countryInput.addEventListener("change", (e) => {
      const newCountry = e.target.value;

      // Update UI immediately
      flagSpan.textContent = countrySchema[newCountry].flag;

      // Save to config
      config.setCountryCode(newCountry);
      toast.success("Country updated");
    });

    // --- Shared Configuration ---------------------------------------------
    // Define CSV Columns based on your schema
    const gameCSVHeaders = Object.entries(gameSchema).map(([key, config]) => ({
      key,
      label: config.labelText,
    }));

    // Helper: Format incoming data (Used by both Import & Merge)
    const formatGameData = (game) => ({
      ...game,
      year: game.year ? Number(game.year) : "",
      price: game.price ? Number(game.price) : 0,
    });

    // --- Delete Data ---------------------------------------------------
    const deleteBtn = document.getElementById("delete-data");

    deleteBtn.addEventListener("click", () => {
      gamesData = [];
      storages.save(config.keys.games, gamesData);

      toast.success(
        "All game data deleted successfully!",
        "Are you sure? This action cannot be undone.",
      );
    });

    // --- Export Data ---------------------------------------------------
    const exportForm = document.getElementById("export-form");

    exportForm.addEventListener("submit", (event) => {
      // Prevent form submission
      event.preventDefault();

      // Collect user format selection
      const selectedFormat = document.getElementById("export-options").value;

      switch (selectedFormat) {
        case "json":
          const json = jsonFile.export({
            data: gamesData,
            fileName: "games",
          });
          if (json) {
            toast.success("JSON created.");
          } else {
            toast.info("No data to be exported.");
          }
          break;
        case "csv":
          const file = csv.export(gamesData, gameCSVHeaders, "games.csv");
          if (file) {
            toast.success("CSV created.");
          } else {
            toast.info("No data to be exported.");
          }
          break;
        // If nothing is selected
        default:
          toast.info("Please select a format");
      }
    });

    // --- Import Data (Overwrite) ---------------------------------------
    const importInput = document.getElementById("import-data");
    const importBtn = document.getElementById("import-data-btn");

    importBtn.addEventListener("click", () => {
      csv
        .import(importInput, {
          columns: gameCSVHeaders,
          storageKey: config.keys.games,
          transform: formatGameData,
        })
        .then((data) => {
          gamesData = data;
          importInput.value = "";
          toast.success("Games imported successfully!");
        })
        .catch((error) => toast.warning(error.message));
    });

    // --- Merge Data (Append) -------------------------------------------
    const mergeInput = document.getElementById("merge-data");
    const mergeBtn = document.getElementById("merge-data-btn");

    mergeBtn.addEventListener("click", () => {
      csv
        .merge(mergeInput, {
          columns: gameCSVHeaders,
          storageKey: config.keys.games,
          transform: formatGameData,
        })
        .then((data) => {
          gamesData = data;
          mergeInput.value = "";
          toast.success("Games merged successfully!");
        })
        .catch((error) => toast.warning(error.message));
    });
  },
};
