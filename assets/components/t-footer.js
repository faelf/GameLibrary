class TFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();

    this.innerHTML = /* html */ `
    <footer class="bg-dark text-white">
      <div class="container d-flex align-items-center justify-content-center">
        <div class="m-4">
          <strong>Rafael Ferreira</strong> &copy; ${year}
        </div>
      </div>
    </footer>
   `;
  }
}

customElements.define("t-footer", TFooter);
