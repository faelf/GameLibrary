import { exportGamesToCSV, importGamesFromCSV } from "../data/data-manager.js";
import { gamesStorage } from "../data/games-storage.js";
import { config } from "../data/config.js";

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
          <div class="mb-3">
            <label for="first-name" class="form-label">First Name</label>
            <input type="text" class="form-control" id="first-name">
            <div class="form-text mb-3">It will be displayed in the dashboard.</div>
            <button id="first-name-btn" type="button" class="btn btn-primary">
              <span class="bi bi-floppy-fill"></span>Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Currency -->
    <div class="col-md-6 col-lg-4">
      <div class="card mb-3">
        <div class="card-header">
          <h3 class="mb-0">Currency</h3>
        </div>
        <div class="card-body">
        <label for="currency-select" class="form-label">Select your preferred currency</label>
          <div class="input-group mb-3">
            <label class="input-group-text" for="currency-select" id="currenct-symbol">
              <span class="bi bi-currency-exchange"></span>
            </label>
            <select id="currency-select" class="form-select">
              <option value="£">£ - British Pound</option>
              <option value="$">$ - US Dollar</option>
              <option value="€">€ - Euro</option>
              <option value="R$">R$ - Brazilian Real</option>
            </select>
          </div>
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
          <label for="theme-select" class="form-label">Select your preferred theme</label>
          <select id="theme-select" class="form-select">
            <option value="dark">Dark Theme</option>
            <option value="light">Light Theme</option>
          </select>
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
          <div class="input-group">
            <input id="import-data" type="file" class="form-control" aria-label="Upload">
            <button class="btn btn-primary" type="button" id="import-data-btn">
              <span class="bi bi-cloud-arrow-up-fill"></span>
              Import & Replace
            </button>
          </div>
        </div>

        <!-- Merge -->
        <div class="col-md-12 col-xl-6 mb-3">
          <h4>Merge Game Data</h4>
          <p class="card-text">
            Add games from an exported file to your existing library.<br>
            No current data will be removed.
          </p>
          <div class="input-group">
            <input id="merge-data" type="file" class="form-control" aria-label="Upload">
            <button class="btn btn-primary" type="button" id="merge-data-btn">
              <span class="bi bi-cloud-plus-fill"></span>
              Import & Merge
            </button>
          </div>
        </div>

        <!-- Export -->
        <div class="col-md-6 col-xl-6 mb-3">
          <h4>Export Game Data</h4>
          <p class="card-text">
            Download your entire game library as a file for backup or transfer.
          </p>
          <button id="export-data" class="btn btn-primary">
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
          <button class="btn btn-danger" id="delete-data">
            <span class="bi-trash3-fill"></span>
            Delete All Games
          </button>
        </div>

      </div>
    </div>
  </div>
</section>

<!-- Toast Currency -->
  <div class="toast-container position-fixed top-0 end-0 p-3">
    <div id="currency-toast" class="toast" role="alert">
      <div class="toast-header">
        <span class="bi bi-check-circle-fill text-success me-2"></span>
        <strong class="me-auto">Success</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
      </div>
      <div class="toast-body" id="toast-body">
      </div>
    </div>
  </div>

  `,
  setup() {
    const toastBody = document.getElementById("toast-body");
    const currency = document.getElementById("currency-select");
    const firstName = document.getElementById("first-name");
    const firstNameBtn = document.getElementById("first-name-btn");
    const deleteData = document.getElementById("delete-data");
    const exportButton = document.getElementById("export-data");
    const importInput = document.getElementById("import-data");
    const importBtn = document.getElementById("import-data-btn");
    let gamesData = gamesStorage.load();

    // Theme Selection
    const themeSelect = document.getElementById("theme-select");
    const currentTheme = config.getTheme();

    // Set initial theme on <html>
    document.documentElement.setAttribute("data-bs-theme", currentTheme);
    themeSelect.value = currentTheme;

    themeSelect.addEventListener("change", (e) => {
      const selectedTheme = e.target.value;

      localStorage.setItem("theme", selectedTheme);
      document.documentElement.setAttribute("data-bs-theme", selectedTheme);

      toastBody.innerText = "Theme updated successfully!";
      const toastElement = document.getElementById("currency-toast");
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    });

    // Display First Name
    firstName.value = config.getFirstName();

    // Save Personal Information
    function updateFirstName() {
      const firstNameInput = firstName.value;
      localStorage.setItem("first-name", firstNameInput);

      // Show toast notification
      toastBody.innerText = `Name updated successfully!`;
      const toastElement = document.getElementById("currency-toast");
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }

    firstNameBtn.addEventListener("click", updateFirstName);

    // Export button
    exportButton.addEventListener("click", function () {
      const success = exportGamesToCSV();

      if (success) {
        toastBody.innerText = "Data exported successfully!";
        const toast = new bootstrap.Toast(document.getElementById("currency-toast"));
        toast.show();
      }
    });

    // Import button
    importBtn.addEventListener("click", async function () {
      const file = importInput.files[0];

      if (!file) {
        alert("Please select a CSV file first.");
        return;
      }

      try {
        const count = await importGamesFromCSV(file);

        toastBody.innerText = `Imported ${count} games successfully!`;
        const toast = new bootstrap.Toast(document.getElementById("currency-toast"));
        toast.show();

        importInput.value = "";
      } catch (error) {
        alert(`Import failed: ${error.message}`);
      }
    });

    // Delete Data
    deleteData.addEventListener("click", function () {
      // Ask user to confirm deletion
      const confirmed = confirm("Are you sure you want to delete all data?");
      if (!confirmed) {
        return;
      }

      // Show toast notification
      toastBody.innerText = "Data deleted successfully!";
      const toastElement = document.getElementById("currency-toast");
      const toast = new bootstrap.Toast(toastElement);
      toast.show();

      gamesData = [];
      gamesStorage.save(gamesData);
    });

    // Load current currency £ default
    const currentCurrency = localStorage.getItem("currency") || "£";
    currency.value = currentCurrency;

    // Save on change
    currency.addEventListener("change", (e) => {
      localStorage.setItem("currency", e.target.value);
      console.log("Currency saved:", e.target.value);

      // Show toast notification
      toastBody.innerText = "Currency saved successfully!";
      const toastElement = document.getElementById("currency-toast");
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    });
  },
};
