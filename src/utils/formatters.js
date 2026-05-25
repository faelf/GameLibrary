import { config } from "./config.js";

export const formatters = {
  longDate(dateString) {
    const locale = config.getLocale();
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  },
  price(price) {
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) return "-";

    const locale = config.getLocale();
    return `${parsedPrice.toLocaleString(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  },
  fullPrice(price) {
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) return "-";

    const currency = config.getCurrency();
    const locale = config.getLocale();
    return `${currency}${parsedPrice.toLocaleString(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  },
};
