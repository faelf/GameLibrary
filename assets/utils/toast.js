/**
 * @module utils/toast
 * Toast utility for displaying notifications.
 * Depends on Bootstrap's Toast component.
 */
export const toast = {
  /**
   * Internal method to configure and show the toast.
   * @param {string} bodyMessage - The main message to display.
   * @param {string|null} confirmMessage - Optional confirmation message.
   * @param {string} type - The type of toast ('success', 'error', 'warning', 'info').
   * @returns {boolean} True if shown (and confirmed if applicable), false otherwise.
   * @private
   */
  _show(bodyMessage, confirmMessage, type) {
    const config = {
      success: {
        title: "Success",
        icon: "bi bi-check-circle-fill text-success",
      },
      error: {
        title: "Error",
        icon: "bi bi-x-circle-fill text-danger",
      },
      warning: {
        title: "Warning",
        icon: "bi bi-exclamation-triangle-fill text-warning",
      },
      info: {
        title: "Info",
        icon: "bi bi-info-circle-fill text-primary",
      },
    };

    // If confirmMessage exists, ask for confirmation
    if (confirmMessage) {
      const confirmed = confirm(confirmMessage);
      if (!confirmed) return false;
    }

    const toastElement = document.getElementById("app-toast");
    const icon = toastElement.querySelector(".toast-header span");
    const toastTitle = toastElement.querySelector(".toast-header strong");
    const toastBody = document.getElementById("toast-body");

    // Use the config object!
    toastBody.innerText = bodyMessage;
    toastTitle.innerText = config[type].title;
    icon.className = config[type].icon + " me-2";

    const toast = new bootstrap.Toast(toastElement);
    toast.show();
    return true;
  },
  /**
   * Displays a success toast.
   * @param {string} bodyMessage - The message to display.
   * @param {string|null} [confirmMessage=null] - Optional confirmation prompt.
   * @returns {boolean} True if confirmed/shown, false if cancelled.
   */
  success(bodyMessage, confirmMessage = null) {
    return this._show(bodyMessage, confirmMessage, "success");
  },

  /**
   * Displays an error toast.
   * @param {string} bodyMessage - The message to display.
   * @param {string|null} [confirmMessage=null] - Optional confirmation prompt.
   * @returns {boolean} True if confirmed/shown, false if cancelled.
   */
  error(bodyMessage, confirmMessage = null) {
    return this._show(bodyMessage, confirmMessage, "error");
  },

  /**
   * Displays a warning toast.
   * @param {string} bodyMessage - The message to display.
   * @param {string|null} [confirmMessage=null] - Optional confirmation prompt.
   * @returns {boolean} True if confirmed/shown, false if cancelled.
   */
  warning(bodyMessage, confirmMessage = null) {
    return this._show(bodyMessage, confirmMessage, "warning");
  },

  /**
   * Displays an info toast.
   * @param {string} bodyMessage - The message to display.
   * @param {string|null} [confirmMessage=null] - Optional confirmation prompt.
   * @returns {boolean} True if confirmed/shown, false if cancelled.
   */
  info(bodyMessage, confirmMessage = null) {
    return this._show(bodyMessage, confirmMessage, "info");
  },
};
