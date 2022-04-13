import { FormValidator } from '../components/FormValidator.js';
import { popupImage, popupImageName, popupFullScreen, objectValidation, initialCards, profilePopup, popupEditButton, nameElement, jobElement, profileForm, nameInput, jobInput, profileName, profileDescription, popupAddButton, popupElementAdd, nameElementAdd, linkElementAdd, addForm, template, cardsElement, popups } from '../utils/consts.js';
import { openPopup, closePopup } from '../utils/utils.js';
import { Card } from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

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

const popupWithFormAdd = new PopupWithForm(popupElementAdd, {
  handlerFormSubmit: () => {
    const item = createCard({
      name: nameElementAdd.value,
      link: linkElementAdd.value
    });
    defaultCardList.addItems(item);
  }
});
popupWithFormAdd.setEventListeners()

const popupWithFormEdit = new PopupWithForm(profilePopup, {
  handlerFormSubmit: () => {
    ({
      name: nameInput.value,
      description: jobInput.value
    });
  }
});
popupWithFormEdit.setEventListeners()

//Функция для кнопки сохранить и инпутов.
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(profilePopup);
}

//Слушатели для открытия и закрытия попапа редактировать.
popupEditButton.addEventListener("click", () =>{
  popupWithFormEdit.open();
  const name = nameElement.textContent;
  const description = jobElement.textContent;
  nameInput.value = name;
  jobInput.value = description;
  editProfileValidator.disabledSubmitButton()
});

popupAddButton.addEventListener("click", () =>{
  popupWithFormAdd.open();
  addForm.reset();
  addCardValidator.resetValidation()
  addCardValidator.disabledSubmitButton()
});

//Слушатели кнопки сохранить
profileForm.addEventListener("submit", handleProfileFormSubmit);

const editProfileValidator = new FormValidator(objectValidation, profilePopup);
const addCardValidator = new FormValidator(objectValidation, popupElementAdd);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

