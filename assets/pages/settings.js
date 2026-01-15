import { csv } from "../utils/csv.js";
import { storages } from "../utils/storages.js";
import { gameSchema } from "../data/game-schema.js";
import { countrySchema } from "../data/country-schema.js";
import { config } from "../utils/config.js";
import { toast } from "../utils/toast.js";

export const settingsPage = {
  title: "Settings",
  html: /* html */ `
<section class="my-2">
  <h2>Settings</h2>

  <div class="row">
    <!-- Personal Info -->
    <div class="col-lg-4">
      <div class="card mb-3">
        <div class="card-header">
          <h3 class="mb-0">Personal Information</h3>
        </div>

        <div class="card-body">
          <form id="user-info-form" class="mb-3">
            <label for="first-name" class="form-label">First Name</label>
            <input type="text" class="form-control" id="first-name">
            <div class="form-text mb-3">It will be displayed in the dashboard.</div>
            <button id="first-name-btn" type="button" class="btn btn-primary">
              <span class="bi bi-floppy-fill"></span>Save
            </button>
          </form>
        </div>
      </div>
    </div>
    <!-- Country -->
    <div class="col-md-6 col-lg-4">
      <div class="card mb-3">
        <div class="card-header">
          <h3 class="mb-0">Country</h3>
        </div>
        <div class="card-body">
          <form id="user-country-form">
            <label for="user-country" class="form-label">Select your country</label>
            <div class="input-group">
              <label class="input-group-text" for="user-country">
                <span id="country-flag">🌎</span>
              </label>
              <select id="user-country" class="form-select">
                <option value="UK">United Kingdom</option>
                <option value="US">United States</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="BR">Brazil</option>
              </select>
            </div>
            <div class="form-text mb-3">It will change how prices are shown in the page.</div>
          </form>
        </div>
      </div>
    </div>
    <!-- Theme -->
    <div class="col-md-6 col-lg-4">
      <div class="card mb-3">
        <div class="card-header">
          <h3 class="mb-0">Theme</h3>
        </div>
        <div class="card-body">
          <form id="user-theme-form">
            <label for="theme-select" class="form-label">Select your preferred theme</label>
            <select id="theme-select" class="form-select">
              <option value="dark">Dark Theme</option>
              <option value="light">Light Theme</option>
            </select>
          </form>
        </div>
      </div>
    </div>

  </div>

  <div class="card mb-3">
    <div class="card-header">
      <h3 class="mb-0">Game Data</h3>
    </div>
    <div class="card-body">
      <div class="row">

        <!-- Import (Replace) -->
        <div class="col-md-12 col-xl-6 mb-3">
          <h4>Import Game Data</h4>
          <p class="card-text">
            Restore your library from an exported file.<br>
            <strong>All existing data will be replaced.</strong>
          </p>
          <form id="csv-import-form" class="input-group">
            <input id="import-data" type="file" class="form-control" aria-label="Upload">
            <button class="btn btn-primary" type="button" id="import-data-btn">
              <span class="bi bi-cloud-arrow-up-fill"></span>
              Import & Replace
            </button>
          </form>
        </div>

        <!-- Merge -->
        <div class="col-md-12 col-xl-6 mb-3">
          <h4>Merge Game Data</h4>
          <p class="card-text">
            Add games from an exported file to your existing library.<br>
            No current data will be removed.
          </p>
          <form id="csv-merge-form" class="input-group">
            <input id="merge-data" type="file" class="form-control" aria-label="Upload">
            <button class="btn btn-primary" type="button" id="merge-data-btn">
              <span class="bi bi-cloud-plus-fill"></span>
              Import & Merge
            </button>
          </form>
        </div>

        <!-- Export -->
        <div class="col-md-6 col-xl-6 mb-3">
          <h4>Export Game Data</h4>
          <p class="card-text">
            Download your entire game library as a file for backup or transfer.
          </p>
          <button type="button" id="export-data" class="btn btn-primary">
            <span class="bi bi-cloud-arrow-down-fill"></span>
            Export Games
          </button>
        </div>

        <!-- Delete -->
        <div class="col-md-6 col-xl-6 mb-3">
          <h4>Delete Game Data</h4>
          <p class="card-text">
            Permanently removes <strong>all games</strong> from your library.<br>
            This action cannot be undone.
          </p>
          <button type="button" class="btn btn-danger" id="delete-data">
            <span class="bi-trash3-fill"></span>
            Delete All Games
          </button>
        </div>

      </div>
    </div>
  </div>
</section>
  `,
  setup() {
    // Get references to all interactive elements
    const firstName = document.getElementById("first-name");
    const firstNameBtn = document.getElementById("first-name-btn");
    const deleteData = document.getElementById("delete-data");
    const exportButton = document.getElementById("export-data");
    const importInput = document.getElementById("import-data");
    const importBtn = document.getElementById("import-data-btn");
    const mergeInput = document.getElementById("merge-data");
    const mergeBtn = document.getElementById("merge-data-btn");
    const themeSelect = document.getElementById("theme-select");
    // Load settings
    let gamesData = storages.load(config.keys.games);

    const currentTheme = config.getTheme();

    // Set initial theme on <html>
    document.documentElement.setAttribute("data-bs-theme", currentTheme);
    themeSelect.value = currentTheme;

    themeSelect.addEventListener("change", (e) => {
      const selectedTheme = e.target.value;

      storages.save(config.keys.theme, selectedTheme);
      document.documentElement.setAttribute("data-bs-theme", selectedTheme);

      toast.success("Theme updated successfully!");
    });

    // Display First Name
    firstName.value = config.getFirstName();

    // Save Personal Information
    function updateFirstName() {
      const firstNameInput = firstName.value;
      storages.save(config.keys.user.firstName, firstNameInput);
      toast.success("Name updated successfully!");
    }

    firstNameBtn.addEventListener("click", updateFirstName);

    // Delete Data
    deleteData.addEventListener("click", function () {
      // Toast will validate users input
      toast.success("All game data deleted successfully!", "Are you sure? This action cannot be undone.");

      gamesData = [];
      storages.save(config.keys.games, gamesData);
    });

    // Update Country
    const flagSpan = document.getElementById("country-flag");
    const userCountryInput = document.getElementById("user-country");
    userCountryInput.value = config.getCountryCode();
    flagSpan.textContent = config.getCountryFlag();

    userCountryInput.addEventListener("change", (e) => {
      const updatedCountry = e.target.value;
      const updatedFlag = countrySchema[updatedCountry].flag;
      flagSpan.textContent = updatedFlag;
      config.setCountryCode(updatedCountry);
      toast.success("Country updated");
    });

    /**
     * Configuration for CSV Export columns.
     * Generated dynamically from the gameSchema.
     */
    const gameCSVHeaders = Object.entries(gameSchema).map(([key, config]) => ({
      key,
      label: config.labelText,
    }));

    // Export
    exportButton.addEventListener("click", function () {
      const success = csv.export(gamesData, gameCSVHeaders, "games.csv");

      if (success) {
        toast.success("Games exported successfully!");
      }
    });

    // Import
    importBtn.addEventListener("click", function () {
      csv
        .import(importInput, {
          columns: gameCSVHeaders,
          storageKey: config.keys.games,
          transform: (game) => ({
            ...game,
            year: game.year ? Number(game.year) : "",
            price: game.price ? Number(game.price) : 0,
          }),
        })
        .then((data) => {
          gamesData = data;
          toast.success("Games imported successfully!");
          importInput.value = "";
        })
        .catch((error) => toast.warning(error.message));
    });

    // Merge
    mergeBtn.addEventListener("click", function () {
      csv
        .merge(mergeInput, {
          columns: gameCSVHeaders,
          storageKey: config.keys.games,
          transform: (game) => ({
            ...game,
            year: game.year ? Number(game.year) : "",
            price: game.price ? Number(game.price) : 0,
          }),
        })
        .then((data) => {
          gamesData = data;
          toast.success("Games merged successfully!");
          mergeInput.value = "";
        })
        .catch((error) => toast.warning(error.message));
    });
  },
};
