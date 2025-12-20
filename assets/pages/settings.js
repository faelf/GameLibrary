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
