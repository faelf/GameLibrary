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
    });
  },
};
