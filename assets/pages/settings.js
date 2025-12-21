import { gamesStorage } from "../data/games-storage.js";
import { config } from "../data/config.js";

export const settingsPage = {
  title: "Settings",
  html: /* html */ `
<section class="m-2">
  <h2>Settings</h2>

  <div class="row">
    <div class="col-md-6">
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
    <div class="col-md-6">
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

    // Display First Name
    firstName.value = config.getFirstName();

    // Save Personal Information
    function updateFirstName() {
      const firstNameInput = firstName.value;
      localStorage.setItem("first-name", firstNameInput);

      let lsFirstName = firstNameInput;

      // Show toast notification
      toastBody.innerText = `Name updated successfully!`;
      const toastElement = document.getElementById("currency-toast");
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }

    firstNameBtn.addEventListener("click", updateFirstName);

    // Export into CSV
    function exportGamesToCSV() {
      if (gamesData.length === 0) {
        alert("No games to export!");
        return;
      }

      // Create CSV header
      const headers = [
        "id",
        "name",
        "platform",
        "year",
        "status",
        "purchase_date",
        "price",
      ];
      const csvRows = [headers.join(",")];

      // Add each game as a CSV row
      gamesData.forEach((game) => {
        const row = [
          game.id,
          `"${game.name}"`, // Quote text fields to handle commas
          game.platform,
          game.year,
          game.status,
          game.purchase_date,
          game.price,
        ];
        csvRows.push(row.join(","));
      });

      // Convert array of rows into a single CSV string
      const csvString = csvRows.join("\n");

      // Create a Blob and URL for download
      const blob = new Blob([csvString], { type: "text/csv" });
      const url = URL.createObjectURL(blob);

      // Create a temporary link and click it to trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = "games-library.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Release the object URL
      URL.revokeObjectURL(url);

      toastBody.innerText = "Data exported successfully!";
      const toastElement = document.getElementById("currency-toast");
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }

    // Import CSV
    importBtn.addEventListener("click", () => {
      const file = importInput.files[0];
      if (!file) {
        alert("Please select a CSV file first.");
        return;
      }

      const reader = new FileReader();

      reader.onload = function (e) {
        const text = e.target.result;

        // Split CSV into rows
        const rows = text.trim().split("\n");

        if (rows.length < 2) {
          alert("CSV file is empty or invalid.");
          return;
        }

        // Get headers
        const headers = rows.shift().split(",");

        // Parse rows into objects
        const importedGames = rows.map((row) => {
          const values = row.split(",");
          const game = {};
          headers.forEach((header, i) => {
            let val = values[i];
            if (val.startsWith('"') && val.endsWith('"')) {
              val = val.slice(1, -1); // Remove quotes
            }
            // Convert numeric fields
            if (header === "id" || header === "year") val = Number(val);
            game[header] = val;
          });
          return game;
        });

        // Replace current library
        gamesStorage.save(importedGames);

        // Show toast notification
        toastBody.innerText = `Imported ${importedGames.length} games successfully!`;
        const toastElement = document.getElementById("currency-toast");
        const toast = new bootstrap.Toast(toastElement);
        toast.show();

        // Reset file input
        importInput.value = "";
      };

      reader.readAsText(file);
    });

    exportButton.addEventListener("click", exportGamesToCSV);

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
