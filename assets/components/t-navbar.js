class TNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */ `
    <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div class="container">
        <a href="#" class="navbar-brand" data-page="home">Game Library</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a href="#" class="nav-link" data-page="home">Home</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
   `;

    // Delegate click events for navigation
    this.querySelector("nav").addEventListener("click", (event) => {
      const button = event.target.closest("[data-page]");
      if (button) {
        const pageName = button.dataset.page;
        const navigateEvent = new CustomEvent("navigate", {
          bubbles: true,
          composed: true,
          detail: { page: pageName },
        });
        this.dispatchEvent(navigateEvent);
      }
    });
  }
}

customElements.define("t-navbar", TNavbar);
