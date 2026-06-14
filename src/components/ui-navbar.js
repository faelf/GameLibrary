class UINavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */ `
    <nav class="navbar navbar-expand-md bg-body-tertiary">
      <div class="container-xxl">
        <a href="#" class="navbar-brand" data-page="home">Game Library</a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">

          <ul class="navbar-nav my-2 my-md-0 gap-2 ms-auto">
            <li class="nav-item">
              <a href="#dashboard-page" class="nav-link" data-page-target="dashboard-page">
                <i class="icon icon-grid"></i>
                <span class="nav-link-text">Dashboard</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#games-list-page" class="nav-link" data-page-target="games-list-page">
                <i class="icon icon-sheet"></i>
                <span class="nav-link-text">Games List</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#settings-page" class="nav-link" data-page-target="settings-page">
                <i class="icon icon-settings"></i>
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
