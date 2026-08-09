import { countrySchema } from "../data/country-schema.js";

export const keys = {
  games: "game-collection",
  user: "user-settings",
};

const defaultSettings = {
  "first-name": "Guest",
  "user-country": "UK",
  "user-theme": "light",
};

export function init() {
  if (!localStorage.getItem(keys.user)) {
    localStorage.setItem(keys.user, JSON.stringify(defaultSettings));
  }
}

export function getUserSettings() {
  const savedSettings = JSON.parse(localStorage.getItem(keys.user));
  return savedSettings;
}

export function getFirstName() {
  return getUserSettings()["first-name"];
}

export function getCountryCode() {
  return getUserSettings()["user-country"];
}

export function getTheme() {
  const theme = getUserSettings()["user-theme"];
  return theme;
}

export function getCountry() {
  return getCountryCode();
}

export function setTheme() {
  const currentTheme = getTheme();
  document.documentElement.setAttribute("data-bs-theme", currentTheme);
}

export function getCurrency(country) {
  const code = country || getCountryCode();

  if (countrySchema[code]) {
    return countrySchema[code].currency;
  } else {
    return undefined;
  }
}

export function getLocale(country) {
  const code = country || getCountryCode();

  if (countrySchema[code]) {
    return countrySchema[code].locale;
  } else {
    return undefined;
  }
}

export function formatDate(dateString) {
  if (!dateString) return "";
  const locale = getLocale();
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatPrice(price) {
  const parsedPrice = parseFloat(price);
  if (isNaN(parsedPrice)) return "";

  const locale = getLocale();
  return parsedPrice.toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatFullPrice(price) {
  const parsedPrice = parseFloat(price);
  if (isNaN(parsedPrice)) return "";

  return `${getCurrency()}${formatPrice(price)}`;
}
