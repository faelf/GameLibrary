class UINavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */ `
    <nav class="navbar navbar-expand-md bg-primary">
      <div class="container">
        <a href="#" class="navbar-brand" data-page="home">Game Library</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a href="#dashboard-page" class="nav-link" data-page-target="dashboard-page">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="nav-svg">
              <rect width="7" height="9" x="3" y="3" rx="1"/>
              <rect width="7" height="5" x="14" y="3" rx="1"/>
              <rect width="7" height="9" x="14" y="12" rx="1"/>
              <rect width="7" height="5" x="3" y="16" rx="1"/>
              </svg>
              <span class="nav-link-text">Dashboard</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#games-list-page" class="nav-link" data-page-target="games-list-page">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="nav-svg">
              <path d="M12 3v18"/>
              <rect width="18" height="18" x="3" y="3" rx="2"/>
              <path d="M3 9h18"/><path d="M3 15h18"/>
              </svg>
              <span class="nav-link-text">Games List</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#settings-page" class="nav-link" data-page-target="settings-page">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="nav-svg">
              <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/>
              <circle cx="12" cy="12" r="3"/>
              </svg>
              <span class="nav-link-text">Settings</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
   `;
  }
}

customElements.define("ui-navbar", UINavbar);
