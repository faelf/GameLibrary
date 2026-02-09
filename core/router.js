/**
 * @typedef {Object} RouterConfig
 * @property {HTMLElement} mainContentArea - Element where pages are rendered
 * @property {Object.<string, PageDefinition>} pageContent - Pages map
 * @property {string} [landingPage="home"] - Initial page
 * @property {string} [baseHtmlPath] - "assets/templates/"
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
 *   mainContentArea: document.getElementById("page-content"),
 *   pageContent: {
 *      "home": {
 *         title: "Home - Welcome",
 *         html: "home.html",
 *         setup(): void,
 *    };
 *   landingPage: "home",
 *   baseHtmlPath = "assets/templates/",
 * });
 * router.init();
 */
export class Router {
  /**
   * Creates a new Router instance.
   * @param {RouterConfig} config
   */
  constructor(config) {
    const {
      mainContentArea,
      pageContent,
      landingPage = "home",
      baseHtmlPath = "assets/html/",
    } = config;

    /** @type {HTMLElement} */
    this.mainContentArea = mainContentArea;

    /** @type {Record<string, PageDefinition>} */
    this.pageContent = pageContent;

    /** @type {string} */
    this.landingPage = landingPage;

    /** @type {string} */
    this.baseHtmlPath = baseHtmlPath;

    // Bind event handlers
    this.handleClick = this.handleClick.bind(this);
    this.handleNavigate = this.handleNavigate.bind(this);
    this.handlePopState = this.handlePopState.bind(this);
  }

  /**
   * Highlights the active link(s) in the navigation menu
   * @param {string} activePageKey
   */
  updateActiveLinks(activePageKey) {
    const links = document.querySelectorAll("[data-page-target]");

    const activeLinkElement = Array.from(links).find(
      (l) => l.dataset.pageTarget === activePageKey,
    );

    const activeGroup = activeLinkElement?.dataset.activeGroup;

    links.forEach((link) => {
      const isExactMatch = link.dataset.pageTarget === activePageKey;
      const isGroupMatch =
        activeGroup && link.dataset.activeGroup === activeGroup;

      if (isExactMatch || isGroupMatch) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  /**
   * Update the main content area with a page.
   * @param {string} pageKey - The key of the page to display.
   * @param {{ pageId?: string }} [params]
   * @returns {Promise<void>}
   */
  async updateMainContent(pageKey, params = {}) {
    const content = this.pageContent[pageKey];
    if (!content) return;

    let html;

    // If html is a file
    if (content.html.endsWith(".html")) {
      // Get path to the html file
      const fullPath = (this.baseHtmlPath || "") + content.html;
      try {
        // Get the html content
        const response = await fetch(fullPath);
        if (!response.ok) throw new Error(`Failed to load ${fullPath}`);
        // Save the html content
        html = await response.text();
      } catch (err) {
        html = `<p style="color:red;">Error loading page: ${err.message}</p>`;
      }
    } else {
      html = content.html; // static string
    }

    // Inject HTML
    this.mainContentArea.innerHTML = html;

    // Call setup
    if (typeof content.setup === "function") {
      await content.setup(params.pageId);
    }

    // Update history
    let url = `#${pageKey}`;
    if (params.pageId != null) url += `?id=${params.pageId}`;
    history.pushState({ pageKey, params }, content.title, url);
    document.title = content.title;

    // Update active links
    this.updateActiveLinks(pageKey);
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

    const pageId = link.dataset.pageTargetId;

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
