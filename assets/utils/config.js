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
    games: "game-library",
    currency: "currency",
    user: {
      default: "You",
      firstName: "first-name",
    },
    theme: "theme",
  },
  getCountryCode() {
    const storedCode = localStorage.getItem("user-country");
    if (storedCode) {
      return storedCode;
    } else {
      return "UK";
    }
  },
  getCountryFlag() {
    const code = this.getCountryCode();
    return countrySchema[code].flag;
  },
  setCountryCode(code) {
    if (countrySchema[code]) {
      localStorage.setItem("user-country", code);
      return true;
    } else {
      console.error("Error: Invalid country code");
      return false;
    }
  },
  getCurrency() {
    const code = this.getCountryCode();
    return countrySchema[code].currency;
  },
  getLocale() {
    const code = this.getCountryCode();
    return countrySchema[code].locale;
  },
  getFirstName() {
    const value = localStorage.getItem(this.keys.user.firstName);
    if (!value) return this.keys.user.default;
    try {
      return JSON.parse(value);
    } catch (e) {
      console.log(e);
      return value;
    }
  },
  getTheme() {
    const value = localStorage.getItem(this.keys.theme);
    if (!value) return "dark";
    try {
      return JSON.parse(value);
    } catch (e) {
      console.log(e);
      return value;
    }
  },
};
