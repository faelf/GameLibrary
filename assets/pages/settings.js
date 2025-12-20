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
            <button class="btn btn-primary">
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
            <button class="btn btn-danger">
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
