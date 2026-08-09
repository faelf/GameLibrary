import { Router } from "./router.js";
import { pageContent } from "../pages/index.js";
import * as config from "../utils/config.js";
import * as storages from "../utils/storages.js";

const router = new Router({
  contentArea: "#page-content",
  pageContent: pageContent,
  landingPage: "dashboard-page",
  baseHtmlPath: "../html/",
  linkAttribute: "data-href",
  idAttribute: "data-id",
});

function initialLoad() {
  config.init();
  const currentTheme = config.getTheme();
  document.documentElement.setAttribute("data-bs-theme", currentTheme);
  storages.init();
  router.init();
}

window.addEventListener("load", initialLoad);
