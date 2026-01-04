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
      firstName: "first-name",
    },
    theme: "theme",
  },
  getCurrency() {
    return localStorage.getItem(this.keys.currency) || "£";
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
    return localStorage.getItem(this.keys.user.firstName) || "you";
  },
  getTheme() {
    return localStorage.getItem(this.keys.theme) || "dark";
  },
};
