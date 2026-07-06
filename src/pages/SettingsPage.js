import { csv } from "../utils/csv.js";
import { jsonFile } from "../utils/json.js";
import { storages } from "../utils/storages.js";
import { gameSchema } from "../data/game-schema.js";
import { countrySchema } from "../data/country-schema.js";
import { config } from "../utils/config.js";
import { toast } from "../utils/toast.js";
import SettingsPageHtml from "../html/settings.html?raw";
import * as formEngine from "../utils/forms.js";

export const SettingsPage = {
  title: "Settings",
  html: SettingsPageHtml,
  async setup() {
    // --- Data Loading (General) ----------------------------------------
    let gamesData = await storages.load(config.keys.games);

    /*
       --- User Settings Form --------------------------------------------
       Information captured by the user form is saved on localstorage only.
    */
    const countryContainer = document.querySelector("#user-country-container");

    const countryIcon = `
      <span id="country-flag">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg-md d-flex align-center">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      </span>
    `;

    const countryWrapper = formEngine.selectGroup(
      {
        inputId: "user-country",
        labelText: "Select your country",
        list: Object.fromEntries(
          Object.entries(countrySchema).map(([key, value]) => [
            key,
            value.label,
          ]),
        ),
        helper: "It will change how prices are shown in the page.",
      },
      countryIcon,
    );

    countryContainer.innerHTML = "";
    countryContainer.appendChild(countryWrapper);

    const userSettingsForm = document.querySelector("#user-settings-form");
    const countrySelect = document.querySelector("#user-country");

    countrySelect.addEventListener("change", () => {
      config.updateFlag();
    });

    formEngine.populate({
      formID: "#user-settings-form",
      data: JSON.parse(localStorage.getItem(config.keys.user)),
    });

    config.updateFlag();

    userSettingsForm.addEventListener("reset", function (event) {
      event.preventDefault();
      formEngine.populate({
        formID: "#user-settings-form",
        data: JSON.parse(localStorage.getItem(config.keys.user)),
      });
      config.updateFlag();
    });

    userSettingsForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const userSettings = formEngine.getData("#user-settings-form");
      localStorage.setItem(config.keys.user, JSON.stringify(userSettings));
      formEngine.populate({
        formID: "#user-settings-form",
        data: JSON.parse(localStorage.getItem(config.keys.user)),
      });
      config.updateFlag();
      config.setTheme();
      toast.success({ text: "Information updated successfully" });
    });

    // --- Delete Data ---------------------------------------------------
    const deleteBtn = document.getElementById("delete-data");

    deleteBtn.addEventListener("click", () => {
      // Toast will return user confirmation
      toast.success({
        text: "All game data deleted successfully!",
        alert: "Are you sure? This action cannot be undone.",
      });

      gamesData = [];
      storages.save(config.keys.games, gamesData);
    });

    // --- Shared Configuration ---------------------------------------------
    // Define CSV Columns based on your schema
    const gameCSVHeaders = Object.entries(gameSchema).map(([key, config]) => ({
      key,
      label: config.labelText,
    }));

    // Helper: Format incoming data (Used by both Import & Merge)
    const formatGameData = (game) => ({
      ...game,
      "release-year": game["release-year"] ? Number(game["release-year"]) : "",
      "price-paid": game["price-paid"] ? Number(game["price-paid"]) : "",
    });

    // --- Export Data ---------------------------------------------------
    const exportForm = document.getElementById("export-form");

    exportForm.addEventListener("submit", (event) => {
      // Prevent form submission
      event.preventDefault();

      // Collect user format selection
      const selectedFormat = document.getElementById("export-options").value;

      switch (selectedFormat) {
        case "json":
          const json = jsonFile.export({
            data: gamesData,
            fileName: "games",
          });
          if (json) {
            toast.success({ text: "JSON created." });
          } else {
            toast.info({ text: "No data to be exported." });
          }
          break;
        case "csv":
          const file = csv.export(gamesData, gameCSVHeaders, "games.csv");
          if (file) {
            toast.success({ text: "CSV created." });
          } else {
            toast.info({ text: "No data to be exported." });
          }
          break;
        // If nothing is selected
        default:
          toast.info({ text: "Please select a format" });
      }
    });

    // --- Import Data (Overwrite) ---------------------------------------
    const importForm = document.getElementById("import-form");

    importForm.addEventListener("submit", (event) => {
      const importInput = document.getElementById("import-data");
      // Prevent form submission
      event.preventDefault();

      // Collect user format selection
      const importFormat = document.getElementById("import-options").value;

      switch (importFormat) {
        case "json":
          toast.success({ text: "Games imported successfully!" });
          break;
        case "csv":
          csv
            .import(importInput, {
              columns: gameCSVHeaders,
              storageKey: config.keys.games,
              transform: formatGameData,
            })
            .then((data) => {
              gamesData = data;
              importInput.value = "";
              toast.success({ text: "Games imported successfully!" });
            })
            .catch((error) => toast.warning({ text: error.message }));
          break;
        // If nothing is selected
        default:
          toast.info({ text: "Please select a format" });
      }
    });

    // --- Merge Data (Append) -------------------------------------------
    const mergeInput = document.getElementById("merge-data");
    const mergeBtn = document.getElementById("merge-data-btn");

    mergeBtn.addEventListener("click", () => {
      csv
        .merge(mergeInput, {
          columns: gameCSVHeaders,
          storageKey: config.keys.games,
          transform: formatGameData,
        })
        .then((data) => {
          gamesData = data;
          mergeInput.value = "";
          toast.success({ text: "Games merged successfully!" });
        })
        .catch((error) => toast.warning({ text: error.message }));
    });

    // --- Set Storage ---------------------------------------------------
    const storageForm = document.querySelector("#storage-form");
    const storageSelect = document.querySelector("#storage-options");
    const firebaseFields = document.querySelectorAll(
      ".mb-3:not(:first-child):not(:last-child)",
    );

    // On load — populate fields with saved values
    storageSelect.value =
      localStorage.getItem(storages.Key) ?? storages.Value.Default;

    const savedConfig = JSON.parse(
      localStorage.getItem(storages.Firebase.Firestore.ConfigKey) ?? "{}",
    );
    document.querySelector("#api-key").value = savedConfig.apiKey ?? "";
    document.querySelector("#auth-domain").value =
      savedConfig.authDomain ?? "";
    document.querySelector("#project-id").value = savedConfig.projectId ?? "";
    document.querySelector("#storage-bucket").value =
      savedConfig.storageBucket ?? "";
    document.querySelector("#sender-id").value =
      savedConfig.messagingSenderId ?? "";
    document.querySelector("#app-id").value = savedConfig.appId ?? "";

    // Show/hide firebase fields based on select
    function toggleFirestoreKeys() {
      const isFirestore = storageSelect.value === storages.Value.Firestore;
      document.querySelector("#firestore-keys").style.display = isFirestore
        ? "block"
        : "none";
    }

    storageSelect.addEventListener("change", toggleFirestoreKeys);
    toggleFirestoreKeys(); // run on load

    // Save
    storageForm.addEventListener("submit", (event) => {
      event.preventDefault();
      localStorage.setItem(storages.Key, storageSelect.value);

      if (storageSelect.value === storages.Value.Firestore) {
        const config = {
          apiKey: document.querySelector("#api-key").value,
          authDomain: document.querySelector("#auth-domain").value,
          projectId: document.querySelector("#project-id").value,
          storageBucket: document.querySelector("#storage-bucket").value,
          messagingSenderId: document.querySelector("#sender-id").value,
          appId: document.querySelector("#app-id").value,
        };
        localStorage.setItem(
          storages.Firebase.Firestore.ConfigKey,
          JSON.stringify(config),
        );
      }
    });
  },
};
