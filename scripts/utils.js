export function openPopup(popup) {
  document.addEventListener("keydown", closePopupEsc)
  popup.classList.add("popup_opened");
}
