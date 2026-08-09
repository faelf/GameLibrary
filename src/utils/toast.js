import * as alerts from "./alerts.js";

const config = {
  success: {
    title: "Success",
    svg: `<path d="M21.801 10A10 10 0 1 1 17 3.335"/>
          <path d="m9 11 3 3L22 4"/>`,
  },
  error: {
    title: "Error",
    svg: `<circle cx="12" cy="12" r="10"/>
          <path d="m15 9-6 6"/>
          <path d="m9 9 6 6"/>`,
  },
  warning: {
    title: "Warning",
    svg: `<circle cx="12" cy="12" r="10"/>
          <line x1="12" x2="12" y1="8" y2="12"/>
          <line x1="12" x2="12.01" y1="16" y2="16"/>`,
  },
  info: {
    title: "Info",
    svg: `<circle cx="12" cy="12" r="10"/>
          <path d="M12 16v-4"/>
          <path d="M12 8h.01"/>`,
  },
};

async function show(bodyMessage, confirmMessage, type, showToast = true) {
  // If confirmMessage exists, ask for confirmation
  if (confirmMessage) {
    const confirmed = await alerts.confirm(confirmMessage);
    if (!confirmed) return false;
  }

  const toastElement = document.querySelector("#app-toast");
  const toastBody = toastElement.querySelector(".toast-body");
  const icon = toastElement.querySelector(".toast-header svg");
  const toastTitle = toastElement.querySelector(".toast-header strong");

  if (showToast) {
    // Use the config object!
    icon.innerHTML = config[type].svg;
    toastTitle.innerText = config[type].title;
    toastBody.innerText = bodyMessage;

    const toast = new bootstrap.Toast(toastElement);
    toast.show();
  }
  return true;
}

/**
 * @param {ToastOptions} toast
 */
export function success({ text, alert = null }) {
  return show(text, alert, "success", !alert);
}

/**
 * @param {ToastOptions} toast
 * ToastOptions
 *  ├─ text: string
 *  └─ alert?: string
 */
export function error({ text, alert = null }) {
  return show(text, alert, "error", !alert);
}

/**
 * @param {ToastOptions} toast
 */
export function warning({ text, alert = null }) {
  return show(text, alert, "warning", !alert);
}

/**
 * @param {ToastOptions} toast
 */
export function info({ text, alert = null }) {
  return show(text, alert, "info", !alert);
}
