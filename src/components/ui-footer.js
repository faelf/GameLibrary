class UIFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();

    this.innerHTML = /* html */ `
    <footer class="bg-body-tertiary">
      <div class="container d-flex align-items-center justify-content-center">
        <div class="m-4">
          <strong>Rafael Ferreira &copy; ${year}</strong>
        </div>
      </div>
    </footer>
   `;
  }
}

customElements.define("ui-footer", UIFooter);
