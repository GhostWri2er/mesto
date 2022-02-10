//Получение селекторов для кнопки редактировать и кнопки закрыть.
const popupElement = document.querySelector(".popup");
const popupContainer = document.querySelector(".popup__container");
const popupEditButton = document.querySelector(".profile__edit-button");
const popupCloseButton = popupContainer.querySelector(".popup__button-close");
const popupSaveButton = popupContainer.querySelector(".popap__button-save");
const profileElement = document.querySelector(".profile");
const nameElement = document.querySelector(".profile__name");
const jobElement = document.querySelector(".profile__description");

//Функция открытия попапа.
const openPopup = function () {
  const name = nameElement.textContent;
  const description = jobElement.textContent;
  nameInput.value = name;
  jobInput.value = description;
  popupElement.classList.add("popup_opened");
};

//Функция закрытия попапа.
const closePopup = function () {
  popupElement.classList.remove("popup_opened");
};

//Функция закрытия попапа на элемент вне попапа.
const closePopupByCkickOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup();
};

//Слушатели для открытия и закрытия попапа.
popupEditButton.addEventListener("click", openPopup);
popupCloseButton.addEventListener("click", closePopup);
popupElement.addEventListener("click", closePopupByCkickOverlay);

//Получение селекторов для инпутов.
const formElement = document.querySelector(".popup__form-edit");
const nameInput = formElement.querySelector(".popup__input-name");
const jobInput = formElement.querySelector(".popup__input-description");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

//Функция для кнопки сохранить и инпутов.
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
}
formElement.addEventListener("submit", handleProfileFormSubmit);
