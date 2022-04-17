//Массив карточек
export const initialCards = [
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

//Объект настроек
export const objectValidation = {
    formSelector: '.popup__form-edit',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: '.popup__input-error',
    errorClass: 'popup__input-error_active',
    popupSection: '.popup__block',
    inputLineRed: 'popup__input_line_red',
  };


//Получение селекторов для попапа редактировать информацию в профиле.
export const profilePopup = document.querySelector(".profile-popup");
export const popupEditButton = document.querySelector(".profile__edit-button");
export const nameElement = document.querySelector(".profile__name");
export const jobElement = document.querySelector(".profile__description");

//Получение селекторов для инпутов.
export const profileForm = document.querySelector(".popup__form-edit");
export const nameInput = profileForm.querySelector(".popup__input-name");
export const jobInput = profileForm.querySelector(".popup__input-description");
export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(".profile__description");

//Получение селекторов для попапа добавить.
export const popupAddButton = document.querySelector(".profile__add-button");
export const popupElementAdd = document.querySelector(".popup_add");
export const popupElementContainerAdd = popupElementAdd.querySelector(".popup__container_add");
export const nameElementAdd = popupElementContainerAdd.querySelector(".popup__input-name_add");
export const linkElementAdd = popupElementContainerAdd.querySelector(".popup__input-description_add");
export const addForm = popupElementContainerAdd.querySelector(".popup__form-edit_add");

//Получение селекторов для карточек(template)
export const template = document.querySelector(".template").content;
export const cardsElement = document.querySelector(".grid-cards");
export const popups = document.querySelectorAll(".popup");

export const popupImage = document.querySelector(".popup__img-FullScreen");
export const popupImageName = document.querySelector(".popup__name-FullScreen");
export const popupFullScreen = document.querySelector(".popup-FullScreen");
