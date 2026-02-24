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
    const locale = config.getLocale();
    price = parseFloat(price);
    return `${price.toLocaleString(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  },
  fullPrice(price) {
    const currency = config.getCurrency();
    const locale = config.getLocale();
    price = parseFloat(price);
    return `${currency}${price.toLocaleString(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  },
};
