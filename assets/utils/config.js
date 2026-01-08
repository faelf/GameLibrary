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
    const currency = this.getCurrency();
    switch (currency) {
      case "£":
        return "en-GB";
      case "$":
        return "en-US";
      case "€":
        return "fr-FR";
      case "R$":
        return "pt-BR";
      default:
        return "en-GB";
    }
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
