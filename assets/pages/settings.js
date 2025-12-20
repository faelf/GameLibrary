import { gamesStorage } from "../data/games-storage.js";

export const settingsPage = {
  title: "Settings",
  html: /* html */ `
  <section class="m-2">
    <h2>Settings</h2>

    <div class="card mb-3">
      <div class="card-header">
        <h3 class="mb-0">Currency</h3>
      </div>
      <div class="card-body">
        <label for="currency-select" class="form-label">Select your preferred currency</label>
        <select id="currency-select" class="form-select">
          <option value="£">£ - British Pound</option>
          <option value="$">$ - US Dollar</option>
          <option value="€">€ - Euro</option>
          <option value="R$">R$ - Brazilian Real</option>
        </select>
      </div>
    </div>

    <div class="card mb-3">
      <div class="card-header">
        <h3 class="mb-0">Game Data</h3>
      </div>
      <div class="card-body">
        <div class="row">

          <!-- Import (Replace) -->
          <div class="col-md-6 col-xl-4 mb-3">
            <h4>Import Game Data</h4>
            <p class="card-text">
              Restore your library from an exported file.<br>
              <strong>All existing data will be replaced.</strong>
            </p>
            <button class="btn btn-primary">
              <span class="bi bi-cloud-arrow-up-fill"></span>
              Import & Replace
            </button>
          </div>

          <!-- Merge -->
          <div class="col-md-6 col-xl-4 mb-3">
            <h4>Merge Game Data</h4>
            <p class="card-text">
              Add games from an exported file to your existing library.<br>
              No current data will be removed.
            </p>
            <button class="btn btn-primary">
              <span class="bi bi-cloud-plus-fill"></span>
              Import & Merge
            </button>
          </div>

          <!-- Export -->
          <div class="col-md-6 col-xl-4 mb-3">
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
          <div class="col-md-6 col-xl-4 mb-3">
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
      <div class="toast-body">
        Currency saved successfully!
      </div>
    </div>
  </div>

  `,
  setup() {
    const currency = document.getElementById("currency-select");
    const deleteData = document.getElementById("delete-data");
    const exportButton = document.getElementById("export-data");
    let gamesData = gamesStorage.load();

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
    }

    exportButton.addEventListener("click", exportGamesToCSV);

    // Delete Data
    deleteData.addEventListener("click", function () {
      // Ask user to confirm deletion
      const confirmed = confirm("Are you sure you want to delete all data?");
      if (!confirmed) {
        return;
      }

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
      const toastElement = document.getElementById("currency-toast");
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    });
  },
};
