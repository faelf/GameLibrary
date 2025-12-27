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
