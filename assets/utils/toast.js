/**
 * @module utils/toast
 * Toast utility for displaying notifications.
 * Depends on Bootstrap's Toast component.
 * @param { string } bodyMessage - The main message to display in the toast.
 * @example toast.error("An error occurred.");
 * @param { string|null } confirmMessage - Optional confirmation message before showing the toast.
 * @example toast.success("Operation completed successfully!", "Are you sure?");
 * @param { string } type - The type is passed implicitly by the calling method.
 */
export const toast = {
  success(bodyMessage, confirmMessage = null) {
    this._show(bodyMessage, confirmMessage, "success");
  },

  error(bodyMessage, confirmMessage = null) {
    this._show(bodyMessage, confirmMessage, "error");
  },

  warning(bodyMessage, confirmMessage = null) {
    this._show(bodyMessage, confirmMessage, "warning");
  },

  info(bodyMessage, confirmMessage = null) {
    this._show(bodyMessage, confirmMessage, "info");
  },

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
      if (!confirmed) return;
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
  },
};
