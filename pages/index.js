import { FormValidator } from '../components/FormValidator.js';
import { popupFullScreen, objectValidation, initialCards, profilePopup, popupEditButton, nameInput, jobInput, popupAddButton, popupElementAdd, nameElementAdd, linkElementAdd, addForm, cardsElement, } from '../utils/consts.js';
import { Card } from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js'

//Класс открытия карточки на весь экран
const popupWithImage = new PopupWithImage(popupFullScreen);

const handleCardClick = (name, link) => {  
  popupWithImage.open(name, link);
}
popupWithImage.setEventListeners();

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
  handlerFormSubmit: (input) => {
    userInfo.setUserInfo(input.name, input.description);
  }
});

//Кнопка редактировать.
popupEditButton.addEventListener("click", () => {
  const {name, description } = userInfo.getUserInfo()
  popupWithFormEdit.open();
  nameInput.value = name;
  jobInput.value = description;
  editProfileValidator.disabledSubmitButton()
});
popupWithFormEdit.setEventListeners();

//Кнопка добавить.
popupAddButton.addEventListener("click", () =>{
  popupWithFormAdd.open();
  addForm.reset();
  addCardValidator.resetValidation()
  addCardValidator.disabledSubmitButton()
});

// Класс UserInfo
const userInfo = new UserInfo ({ userName: ".profile__name",  aboutUser: ".profile__description" })
console.log(userInfo)

//Классы Валидации форм
const editProfileValidator = new FormValidator(objectValidation, profilePopup);
const addCardValidator = new FormValidator(objectValidation, popupElementAdd);

//Вызов валидации на обоих попапах.
editProfileValidator.enableValidation();
addCardValidator.enableValidation();

