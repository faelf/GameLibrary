import { countrySchema } from "../data/country-schema.js";

/**
 * Configuration utility for managing application settings.
 * Handles retrieval of user preferences from localStorage.
 * @example config.getCurrency(); // returns the stored currency or default "£"
 * @example config.getLocale(); // returns locale based on stored currency
 * @example config.getFirstName(); // returns stored first name or default "you"
 * @example config.getTheme(); // returns stored theme or default "dark"
 */
export const config = {
  keys: {
    games: "games",
    user: "user-settings",
  },
  _getUserSettings() {
    try {
      const savedSettings = localStorage.getItem(this.keys.user);

      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        return parsedSettings;
      } else {
        return {};
      }
    } catch {
      return {};
    }
  },
  getFirstName() {
    const settings = this._getUserSettings();
    const firstName = settings["first-name"];

    if (firstName) {
      return firstName;
    } else {
      return "Stranger";
    }
  },
  getCountry() {
    const settings = this._getUserSettings();
    const country = settings["user-country"];

    if (country) {
      return country;
    } else {
      return "UK";
    }
  },
  getTheme() {
    const settings = this._getUserSettings();
    const theme = settings["user-theme"];

    if (theme) {
      return theme;
    } else {
      return "light";
    }
  },
  setTheme() {
    const currentTheme = this.getTheme();
    document.documentElement.setAttribute("data-bs-theme", currentTheme);
  },
  getCountryCode() {
    return this.getCountry();
  },
  getCountryFlag(country) {
    let code;

    if (country) {
      code = country;
    } else {
      code = this.getCountryCode();
    }

    if (countrySchema[code]) {
      return countrySchema[code].flag;
    } else {
      return undefined;
    }
  },
  updateFlag({
    flagText = "#country-flag",
    flagSelect = "#user-country",
  } = {}) {
    const flag = document.querySelector(flagText);
    const flagSelected = document.querySelector(flagSelect).value;

    if (flag && flagSelected) {
      flag.innerHTML = this.getCountryFlag(flagSelected);
    }
  },
  getCurrency(country) {
    let code;

    if (country) {
      code = country;
    } else {
      code = this.getCountryCode();
    }

    if (countrySchema[code]) {
      return countrySchema[code].currency;
    } else {
      return undefined;
    }
  },
  getLocale(country) {
    let code;

    if (country) {
      code = country;
    } else {
      code = this.getCountryCode();
    }

    if (countrySchema[code]) {
      return countrySchema[code].locale;
    } else {
      return undefined;
    }
  },
};
