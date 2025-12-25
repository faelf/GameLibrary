/* 
  Import configuration, page definitions, and Web Components
*/
import { config } from "../assets/data/config.js";
import { pageContent } from "../assets/pages/index.js";
import "../assets/components/components.js";
import { Router } from "./router.js";

/* 
  Get reference to the main content area where page HTML will be injected
  ------------------------------------------------------------------------
  - This element will be updated whenever the router navigates to a new page
*/
const mainContentArea = document.getElementById("page-content");

/* 
  Initialise the router
  ----------------------
  - Pass the main content area and pages object to the Router
  - Call init() to attach all necessary event listeners
*/
const router = new Router(mainContentArea, pageContent);
router.init();

/* 
  Event Listener: window.load
  ----------------------------
  Runs when the page is fully loaded.
  Sets theme, parses URL hash, and shows the initial page.
*/

function initialLoad() {
  // Get current theme from config and apply it to the html tag
  const currentTheme = config.getTheme();
  document.documentElement.setAttribute("data-bs-theme", currentTheme);

  // Parse the URL hash to determine which page to show
  const hash = window.location.hash.substring(1); // Remove leading '#'
  const [pageKey, query] = hash.split("?"); // Separate page key and query string
  const params = {};

  // If query parameters exist, extract them (e.g., ?id=123)
  if (query) {
    const urlParams = new URLSearchParams(query);
    params.gameId = urlParams.get("id");
  }

  // Show the page from the hash, or default to 'dashboard-page' if none
  router.updateMainContent(pageKey || "dashboard-page", params);
}

window.addEventListener("load", initialLoad);
