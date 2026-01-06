class UIToast extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */ `
    <div class="toast-container position-fixed top-0 end-0 p-3">
      <div id="app-toast" class="toast" role="alert">
        <div class="toast-header">
          <span><!-- Icon will be added here --></span>
          <strong class="me-auto">
            <!-- Toast title will be inserted here -->
          </strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body" id="toast-body">
          <!-- Toast message will be inserted here -->
        </div>
      </div>
    </div>
    `;
  }
}

customElements.define("ui-toast", UIToast);
