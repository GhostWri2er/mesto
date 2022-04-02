import { FormValidator } from './FormValidator.js';
import { popupImage, popupImageName, popupFullScreen } from './consts.js';
import { openPopup, closePopup, closePopupEsc } from './utils.js';
import { Card } from './card.js';

const objectValidation = {
  formSelector: '.popup__form-edit',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: '.popup__input-error',
  errorClass: 'popup__input-error_active',
  popupSection: '.popup__block',
  inputLineRed: 'popup__input_line_red',
};

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//Селекторы.

//Получение селекторов для попапа редактировать информацию в профиле.
const profilePopup = document.querySelector(".profile-popup");
const popupEditButton = document.querySelector(".profile__edit-button");
const nameElement = document.querySelector(".profile__name");
const jobElement = document.querySelector(".profile__description");

//Получение селекторов для инпутов.
const profileForm = document.querySelector(".popup__form-edit");
const nameInput = profileForm.querySelector(".popup__input-name");
const jobInput = profileForm.querySelector(".popup__input-description");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

//Получение селекторов для попапа добавить.
const popupAddButton = document.querySelector(".profile__add-button");
const popupElementAdd = document.querySelector(".popup_add");
const popupElementContainerAdd = popupElementAdd.querySelector(
  ".popup__container_add"
);
const nameElementAdd = popupElementContainerAdd.querySelector(
  ".popup__input-name_add"
);
const linkElementAdd = popupElementContainerAdd.querySelector(
  ".popup__input-description_add"
);
const addForm = popupElementContainerAdd.querySelector(".popup__form-edit_add");

//Получение селекторов для карточек(template)
const template = document.querySelector(".template").content;
const cardsElement = document.querySelector(".grid-cards");
const popups = document.querySelectorAll(".popup");

//Функции.

const handleCardClick = (name, link) => {
    popupImage.src = link;
    popupImage.alt = `Изображение ${name}`;
    popupImageName.textContent = name;
    openPopup(popupFullScreen);
}

//Функция создания карточки.

function createCard(item) {
  const card = new Card (item, '#template', handleCardClick)
  const cardElement = card.getCardElement()
  return cardElement
}

function renderCard(item) {
  cardsElement.prepend(createCard(item));
}

//Функция Обхода массива карточек.
function renderCards(items) {
  items.forEach(renderCard);
}

renderCards(initialCards);

//Функция для кнопки создать.
function handleAddFormSubmit() {
  renderCard({
    name: nameElementAdd.value,
    link: linkElementAdd.value,
  });
  closePopup(popupElementAdd);
}

//Слушатель для кнопки создать.
addForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  handleAddFormSubmit();
});

//Функция закрытия попапа на крестик и оверлей.
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

//Функция открытия попапа редактировать
const openPopupProfile = function () {
  const name = nameElement.textContent;
  const description = jobElement.textContent;
  nameInput.value = name;
  jobInput.value = description;
  openPopup(profilePopup);
};

//Функция открытия попапа добавить
const openPopupAdd = function () {
  openPopup(popupElementAdd);
  addForm.reset();
  addCardValidator.resetValidation()
  addCardValidator.disabledSubmitButton()

};

//Функция для кнопки сохранить и инпутов.
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(profilePopup);
}

//Слушатели для открытия и закрытия попапа редактировать.
popupEditButton.addEventListener("click", openPopupProfile);

//Слушатели для открытия и закрытия попапа добавить.
popupAddButton.addEventListener("click", openPopupAdd);

//Слушатели кнопки сохранить
profileForm.addEventListener("submit", handleProfileFormSubmit);

const editProfileValidator = new FormValidator(objectValidation, profilePopup);
const addCardValidator = new FormValidator(objectValidation, popupElementAdd);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

