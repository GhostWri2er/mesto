import './index.css';
import { FormValidator } from '../components/FormValidator.js';
import { popupFullScreen, objectValidation, profilePopup, popupEditButton, nameInput, jobInput, popupAddButton, popupElementAdd, nameElementAdd, linkElementAdd, addForm, cardsElement, } from '../utils/consts.js';
import { Card } from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40',
  headers: {
    authorization: '8a35d6a5-9675-4746-b567-877f8304d5ec',
    'Content-Type': 'application/json'
  }
}); 

const cards = api.getInitialCards();
cards.then((data) => {
  const defaultCardList = new Section(
    {
      items: data,
      renderer: (item) => {
        const cardElement = createCard(item);
        defaultCardList.addItems(cardElement);
      },
    } , cardsElement);
    
    defaultCardList.renderCards(data);
}).catch((err) => alert(err));

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

//Классы Валидации форм
const editProfileValidator = new FormValidator(objectValidation, profilePopup);
const addCardValidator = new FormValidator(objectValidation, popupElementAdd);

//Вызов валидации на обоих попапах.
editProfileValidator.enableValidation();
addCardValidator.enableValidation();

