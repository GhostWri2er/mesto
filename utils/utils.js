export function openPopup(popup) {
  document.addEventListener("keydown", closePopupEsc)
  popup.classList.add("popup_opened");
}

//Функция закрытия попапа.
export function closePopup(popup) {
  document.removeEventListener("keydown", closePopupEsc)
  popup.classList.remove("popup_opened");
}

export function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}
