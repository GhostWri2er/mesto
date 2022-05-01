import './index.css';
import { FormValidator } from '../components/FormValidator.js';
import { popupFullScreen, objectValidation, profilePopup, popupEditButton, nameInput, jobInput, popupAddButton, popupElementAdd, nameElementAdd, linkElementAdd, addForm, cardsElement, initialCards } from '../utils/consts.js';
import { Card } from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40/',
  headers: {
    authorization: '8a35d6a5-9675-4746-b567-877f8304d5ec',
    'Content-Type': 'application/json'
  }
}); 

api.getProfile()
.then(res => {
  userInfo.setUserInfo(res.name, res.about)
})

api.getCards()
.then(cardList => {
  cardList.forEach(data =>{
    const item = createCard({
      name: data.name,
      link: data.link
    });
    section.addItems(item)
  })
})



// api.getProfile()
//   .then((userInform) => {
//   userInfo.setUserInfo({ user: userInform})
// }).catch((err) => alert(err));

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

const section = new Section(
  {
    items: [],
    renderer: (item) => {
      const cardElement = createCard(item);
      section.addItems(cardElement);
    },
  } , '.grid-cards');
  section.renderItems(initialCards);



const popupWithFormAdd = new PopupWithForm(popupElementAdd, {
  handlerFormSubmit: (data) => {
    const item = createCard({
      name: data['place'],
      link: data.link
    });
    section.addItems(item);
  }
});
popupWithFormAdd.setEventListeners()



const popupWithFormEdit = new PopupWithForm(profilePopup, {
  handlerFormSubmit: (data) => {
    api.setUserInfoServer({user: data})
    .then((data) => {
    userInfo.setUserInfo(data.name, data.about);
  }).catch((err) => alert(err));
  }
});

//Кнопка редактировать.
popupEditButton.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo()
  nameInput.value = name;
  jobInput.value = description;
  popupWithFormEdit.open();
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

