/**
 * @typedef {Object} RouterConfig
 * @property {HTMLElement} mainContentArea - Element where pages are rendered
 * @property {Object.<string, PageDefinition>} pageContent - Pages map
 * @property {string} [landingPage="home"] - Initial page
 */

/**
 * @typedef {Object} PageDefinition
 * @property {string} title - Page title shown in the browser tab
 * @property {string} html - HTML string injected into the main content area
 * @property {() => Promise<void>|void} [setup] - Optional setup function called after the page HTML is rendered
 */

/**
 * Router class for handling SPA navigation and page updates.
 * Manages click delegation, history navigation, and page content updates.
 *
 * @example
 * const router = new Router({
 *   mainContentArea: document.querySelector("main"),
 *   pageContent,
 *   landingPage: "home"
 * });
 * router.init();
 */
export class Router {
  /**
   * Creates a new Router instance.
   * @param {RouterConfig} config
   */
  constructor(config) {
    const { mainContentArea, pageContent, landingPage = "home" } = config;

    /** @type {HTMLElement} */
    this.mainContentArea = mainContentArea;

    /** @type {Record<string, PageDefinition>} */
    this.pageContent = pageContent;

    /** @type {string} */
    this.landingPage = landingPage;

    // Bind event handlers
    this.handleClick = this.handleClick.bind(this);
    this.handleNavigate = this.handleNavigate.bind(this);
    this.handlePopState = this.handlePopState.bind(this);
  }

  /**
   * Update the main content area with a page.
   * @param {string} pageKey - The key of the page to display.
   * @param {{ pageId?: string }} [params]
   * @returns {Promise<void>}
   */
  async updateMainContent(pageKey, params = {}) {
    /** @type {PageDefinition|undefined} */
    const content = this.pageContent[pageKey];
    if (!content) return;

    this.mainContentArea.innerHTML = content.html;

    if (typeof content.setup === "function") {
      await content.setup(params.pageId);
    }

    let url = `#${pageKey}`;
    if (params.pageId) {
      url += `?id=${params.pageId}`;
    }

    history.pushState({ pageKey, params }, content.title, url);
    document.title = content.title;
  }

  /**
   * Parses the current URL hash and loads the corresponding page.
   * Used for initial load and popstate fallback.
   */
  loadCurrentPage() {
    const hash = window.location.hash.substring(1);
    const [pageKey, query] = hash.split("?");

    /** @type {{ pageId?: string }} */
    const params = {};

    if (query) {
      const urlParams = new URLSearchParams(query);
      params.pageId = urlParams.get("id") ?? undefined;
    }

    this.updateMainContent(pageKey || this.landingPage, params);
  }

  /**
   * Handle clicks on elements with a `data-page-target` attribute.
   * @param {MouseEvent} event
   */
  handleClick(event) {
    const target = /** @type {HTMLElement} */ (event.target);
    const link = target.closest("[data-page-target]");
    if (!link) return;

    event.preventDefault();

    const pageKey = link.dataset.pageTarget;
    if (!pageKey) return;

    // Always a string now
    const pageId = link.dataset.pageTargetId?.toString();

    document.dispatchEvent(
      new CustomEvent("navigate", {
        detail: { pageKey, pageId },
      }),
    );
  }

  /**
   * Handle custom 'navigate' events.
   * @param {CustomEvent<{ pageKey: string, pageId?: string }>} event
   */
  handleNavigate(event) {
    this.updateMainContent(event.detail.pageKey, event.detail);
  }

  /**
   * Handle browser back/forward navigation.
   * @param {PopStateEvent} event
   */
  handlePopState(event) {
    if (event.state) {
      this.updateMainContent(event.state.pageKey, event.state.params);
    } else {
      this.loadCurrentPage();
    }
  }

  /**
   * Initialize the router by adding necessary event listeners.
   */
  init() {
    document.addEventListener("click", this.handleClick);
    document.addEventListener("navigate", this.handleNavigate);
    window.addEventListener("popstate", this.handlePopState);
  }
}
