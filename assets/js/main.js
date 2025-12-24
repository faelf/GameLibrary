import { config } from "../data/config.js";

// Import Pages
import { pageContent } from "../pages/index.js";

// Import Components
import "../components/components.js";

// Get a reference to the main content area where pages will be injected
const mainContentArea = document.getElementById("page-content");

/* 
  Function: updateMainContent
  ----------------------------
  Updates the <main> content area with the HTML of the selected page.
  Calls the page's setup() function if it exists (for async operations like fetching data).
  Updates browser history/URL and document title.
*/
async function updateMainContent(pageKey, params = {}) {
  // Get page data from pageContent object
  const content = pageContent[pageKey];

  if (content) {
    // Replace all existing HTML in main content area with the new page's HTML
    mainContentArea.innerHTML = content.html;

    // Call the page's setup function if it exists (async)
    if (typeof content.setup === "function") {
      await content.setup(params.gameId);
    }

    // Update URL with gameId if present
    const url = params.gameId
      ? `#${pageKey}?id=${params.gameId}`
      : `#${pageKey}`;

    // Update browser history/URL without reloading the page
    history.pushState({ pageKey, params }, content.title, url);
    document.title = content.title;

    // Update document title to match the page
    document.title = content.title;
  }
}

/* 
  Event Listener: navigate
  ------------------------
  Listens for a custom "navigate" event and updates the page content accordingly.
  This event can be dispatched manually from components like the navbar.
*/
document.addEventListener("navigate", (event) => {
  updateMainContent(event.detail.page, event.detail);
});

/* 
  Event Listener: click
  ---------------------
  Delegates click events on any element with a data-page attribute.
  When clicked, dispatches a "navigate" event with the page to load.
*/
document.addEventListener("click", (event) => {
  // Find the closest element with data-page
  const button = event.target.closest("[data-page]");

  // Ignore clicks outside data-page elements
  if (!button) return;

  // Prevents the a tags to load a page
  event.preventDefault();

  // Dispatch a custom navigate event so updateMainContent runs
  document.dispatchEvent(
    new CustomEvent("navigate", { detail: { page: button.dataset.page } })
  );
});

/* 
  Event Listener: load
  --------------------
  Runs when the window first loads. Determines which page to show initially
  based on the URL hash (e.g., #home) or defaults to 'home'.
*/
window.addEventListener("load", () => {
  const currentTheme = config.getTheme();
  document.documentElement.setAttribute("data-bs-theme", currentTheme);
  const hash = window.location.hash.substring(1);
  const [pageKey, query] = hash.split("?");
  const params = {};
  if (query) {
    const urlParams = new URLSearchParams(query);
    params.gameId = urlParams.get("id");
  }
  updateMainContent(pageKey || "dashboard-page", params);
});

/* 
  Event Listener: popstate
  ------------------------
  Runs when the user navigates using browser back/forward buttons.
  Updates the page content based on the current URL hash.
*/
window.addEventListener("popstate", (event) => {
  if (event.state) {
    updateMainContent(event.state.pageKey, event.state.params);
  } else {
    const hash = window.location.hash.substring(1);
    const [pageKey, query] = hash.split("?");
    const params = {};
    if (query) {
      const urlParams = new URLSearchParams(query);
      params.gameId = urlParams.get("id");
    }
    updateMainContent(pageKey || "dashboard-page", params);
  }
});
