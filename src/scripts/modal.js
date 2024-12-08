function openModal(popup) {
  popup.classList.add("popup_is-opened");
  const closeBtn = popup.querySelector(".popup__close");

  document.addEventListener("keydown", escHandler);
  closeBtn.addEventListener("click", () => closeModal(popup));
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) closeModal(popup);
  });
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}

function escHandler(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
    evt.target.removeEventListener("keydown", escHandler);
  }
}

export { openModal, closeModal };
