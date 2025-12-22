export const config = {
  getCurrency() {
    return localStorage.getItem("currency") || "£";
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
    return localStorage.getItem("first-name") || "you";
  },
  getTheme() {
    return localStorage.getItem("theme") || "dark";
  },
};
