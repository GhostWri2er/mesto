import { FormValidator } from '../components/FormValidator.js';
import { popupImage, popupImageName, popupFullScreen, objectValidation, initialCards, profilePopup, popupEditButton, nameElement, jobElement, profileForm, nameInput, jobInput, profileName, profileDescription, popupAddButton, popupElementAdd, nameElementAdd, linkElementAdd, addForm, template, cardsElement, popups } from '../utils/consts.js';
import { openPopup, closePopup } from '../utils/utils.js';
import { Card } from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';

//Функция открытия карточки на весь экран

const popupWithImage = new PopupWithImage(popupFullScreen);

const handleCardClick = (name, link) => {  
  popupWithImage.open(name, link);
}

//Функция создания карточки.

function createCard(item) {
  const card = new Card (item, '#template', handleCardClick)
  const cardElement = card.getCardElement()
  return cardElement
}

const defaultCardList = new Section(
{
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    defaultCardList.addItems(cardElement);
  },
} , cardsElement );


defaultCardList.renderCards(initialCards);


function renderCard(item) {
  cardsElement.prepend(createCard(item));
}

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

