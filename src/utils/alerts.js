export function confirm(message) {
  return new Promise((resolve) => {
    const confirmModalElement = document.getElementById("confirmation-modal");
    if (!confirmModalElement) {
      console.error(
        "Confirmation modal element with ID 'confirmation-modal' not found!",
      );
      resolve(false);
      return;
    }

    const confirmModal = new bootstrap.Modal(confirmModalElement);
    const modalBody = confirmModalElement.querySelector(".modal-body");
    const confirmBtn = confirmModalElement.querySelector("#confirm-btn");
    const cancelBtn = confirmModalElement.querySelector("#cancel-btn");

    modalBody.textContent = message;

    const onConfirm = () => {
      cleanup();
      resolve(true);
    };

    const onCancel = () => {
      cleanup();
      resolve(false);
    };

    const cleanup = () => {
      confirmBtn.removeEventListener("click", onConfirm);
      cancelBtn.removeEventListener("click", onCancel);
      confirmModal.hide();
    };

    confirmBtn.addEventListener("click", onConfirm, { once: true });
    cancelBtn.addEventListener("click", onCancel, { once: true });

    confirmModal.show();
  });
}
