/* 
  Import configuration, page definitions, and Web Components
*/
import { config } from "../assets/utils/config.js";
import { pageContent } from "../assets/pages/index.js";
import "../assets/components/index.js";
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
const router = new Router({
  mainContentArea,
  pageContent,
  landingPage: "dashboard-page",
});
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
  router.loadCurrentPage();
}

window.addEventListener("load", initialLoad);
