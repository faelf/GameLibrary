/**
 * Router class for handling SPA navigation and page updates.
 * Manages click delegation, history navigation, and page content updates.
 * @example
 * const router = new Router(mainContentArea, pageContent);
 * router.init();
 */
export class Router {
  /**
   * Create a new Router.
   * @param {HTMLElement} mainContentArea - The main element where pages will be rendered.
   * @param {Object} pageContent - Object containing pages: { pageKey: { html, setup, title } }
   */
  constructor(mainContentArea, pageContent) {
    /** @typedef {HTMLElement} */
    this.mainContentArea = mainContentArea;

    /**
     * @typedef {Object} Page
     * @property {string} html - HTML string that will be injected into the main content area
     * @property {string} title - Page title shown in the browser tab
     * @property {(gameId?: string) => Promise<void>|void} [setup]
     *   Optional setup function called after the page HTML is rendered
     */
    this.pageContent = pageContent;

    // Bind event handlers so 'this' refers to the router instance
    this.handleClick = this.handleClick.bind(this);
    this.handleNavigate = this.handleNavigate.bind(this);
    this.handlePopState = this.handlePopState.bind(this);
  }

  /**
   * Update the main content area with a page.
   * @param {string} pageKey - The key of the page to display.
   * @param {Object} [params={}] - Optional parameters (e.g., { gameId: 123 }).
   * @returns {Promise<void>} - A promise that resolves when the content is updated.
   */
  async updateMainContent(pageKey, params = {}) {
    // Get the page data from the pageContent object
    const content = this.pageContent[pageKey];

    if (content) {
      // Replace all existing HTML in the main content area with the new page's HTML
      this.mainContentArea.innerHTML = content.html;

      // If the page has a setup function, call it (e.g., for async data fetching)
      if (typeof content.setup === "function") {
        await content.setup(params.gameId);
      }

      // Construct the URL hash, including gameId if provided
      let url = "#" + pageKey; // Start with the page key

      // If there is a gameId, add it as a query string
      if (params.gameId) {
        url = url + "?id=" + params.gameId;
      }

      // Update browser history without reloading the page
      history.pushState({ pageKey, params }, content.title, url);

      // Update the browser tab title
      document.title = content.title;
    }
  }

  /**
   * Handle clicks on elements with a `data-page-target` attribute.
   * Dispatches a custom 'navigate' event.
   * @param {MouseEvent} event - The click event object.
   */
  handleClick(event) {
    // Find the closest element with the data-page attribute
    const button = event.target.closest("[data-page-target]");
    // Ignore clicks outside navigational elements
    if (!button) return;

    // Prevent the default anchor behavior (page reload)
    event.preventDefault();

    // Dispatch a custom 'navigate' event with the target page
    document.dispatchEvent(
      new CustomEvent("navigate", {
        detail: { page: button.dataset.pageTarget },
      })
    );
  }

  /**
   * Handle custom 'navigate' events.
   * Updates the main content area to the requested page.
   * @param {CustomEvent} event- The navigate event object.
   */
  handleNavigate(event) {
    this.updateMainContent(event.detail.page, event.detail);
  }

  /**
   * Handle browser back/forward navigation.
   * Updates the main content area based on the current history state or URL hash.
   * @param {PopStateEvent} event - The popstate event object.
   */
  handlePopState(event) {
    if (event.state) {
      // If state exists, update content based on stored pageKey and params
      this.updateMainContent(event.state.pageKey, event.state.params);
    } else {
      // If no state, fallback: parse URL hash for pageKey and params
      const hash = window.location.hash.substring(1);
      const [pageKey, query] = hash.split("?");
      const params = {};
      if (query) {
        const urlParams = new URLSearchParams(query);
        params.gameId = urlParams.get("id");
      }

      // Show the page from the hash or default to 'dashboard-page'
      this.updateMainContent(pageKey || "dashboard-page", params);
    }
  }

  /**
   * Initialize the router by adding necessary event listeners.
   * - Click delegation for navigation
   * - Custom 'navigate' events
   * - Browser back/forward navigation
   */
  init() {
    document.addEventListener("click", this.handleClick);
    document.addEventListener("navigate", this.handleNavigate);
    window.addEventListener("popstate", this.handlePopState);
  }
}
