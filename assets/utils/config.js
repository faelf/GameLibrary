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
  countrySettings: {
    UK: { label: "United Kingdom", locale: "en-GB", currency: "£", flag: "🇬🇧" },
    US: { label: "United States", locale: "en-US", currency: "$", flag: "🇺🇸" },
    FR: { label: "France", locale: "fr-FR", currency: "€", flag: "🇫🇷" },
    DE: { label: "Germany", locale: "de-DE", currency: "€", flag: "🇩🇪" },
    BR: { label: "Brazil", locale: "pt-BR", currency: "R$", flag: "🇧🇷" },
  },
  getCountryCode() {
    const storedCode = localStorage.getItem("user-country");
    if (storedCode) {
      return storedCode;
    } else {
      return "UK";
    }
  },
  setCountryCode(code) {
    if (this.countrySettings[code]) {
      localStorage.setItem("user-country", code);
      return true;
    } else {
      console.error("Error: Invalid country code");
      return false;
    }
  },
  getCurrency() {
    const value = localStorage.getItem(this.keys.currency);
    if (!value) return "£";
    try {
      return JSON.parse(value);
    } catch (e) {
      console.log(e);
      return value;
    }
  },
  getLocale() {
    const code = this.getCountryCode();
    return this.countrySettings[code].locale;
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
