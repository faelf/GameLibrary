import SettingsPageHtml from "../html/settings.html?raw";
import { database, firebase } from "../utils/storages.js";
import * as config from "../utils/config.js";
import * as toast from "../utils/toast.js";
import * as formEngine from "../utils/forms.js";

export const SettingsPage = {
  title: "Settings",
  html: SettingsPageHtml,
  async setup() {
    /**
     * User Settings
     * -------------------------------------------------------------------
     */

    const userSettingsForm = document.querySelector("#user-settings-form");

    formEngine.populate({
      formID: "#user-settings-form",
      data: config.getUserSettings(),
    });

    userSettingsForm.addEventListener("reset", function (event) {
      event.preventDefault();
      formEngine.populate({
        formID: "#user-settings-form",
        data: config.getUserSettings(),
      });
    });

    userSettingsForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const userSettings = formEngine.getData("#user-settings-form");

      localStorage.setItem(config.keys.user, JSON.stringify(userSettings));

      formEngine.populate({
        formID: "#user-settings-form",
        data: config.getUserSettings(),
      });

      config.setTheme();
      toast.success({ text: "Information updated successfully" });
    });

    /**
     * Set Storage
     * -------------------------------------------------------------------
     */

    const storageForm = document.querySelector("#storage-form");
    const storageSelect = document.querySelector("#storage-options");
    const firebaseFields = document.querySelectorAll(
      ".mb-3:not(:first-child):not(:last-child)",
    );

    // On load — populate fields with saved values
    storageSelect.value =
      localStorage.getItem(database.Key) ?? database.Default;

    const savedConfig = JSON.parse(
      localStorage.getItem(firebase.Firestore.ConfigKey) ?? "{}",
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
      const isFirestore = storageSelect.value === database.Firestore;
      document.querySelector("#firestore-keys").style.display = isFirestore
        ? "block"
        : "none";
    }

    storageSelect.addEventListener("change", toggleFirestoreKeys);
    toggleFirestoreKeys(); // run on load

    // Save
    storageForm.addEventListener("submit", (event) => {
      event.preventDefault();
      localStorage.setItem(database.Key, storageSelect.value);

      if (storageSelect.value === database.Firestore) {
        const config = {
          apiKey: document.querySelector("#api-key").value,
          authDomain: document.querySelector("#auth-domain").value,
          projectId: document.querySelector("#project-id").value,
          storageBucket: document.querySelector("#storage-bucket").value,
          messagingSenderId: document.querySelector("#sender-id").value,
          appId: document.querySelector("#app-id").value,
        };
        localStorage.setItem(
          firebase.Firestore.ConfigKey,
          JSON.stringify(config),
        );
      }
    });
  },
};
