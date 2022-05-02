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

let userId;

api.getProfile()
.then(res => {
  userInfo.setUserInfo(res.name, res.about)
  userId = res._id
})

api.getCards()
.then(cardList => {
  cardList.forEach(data =>{
    const item = createCard({
      name: data.name,
      link: data.link,
      likes: data.likes,
      id: data._id,
      userId: userId,
      ownerId: data.owner._id
    });
    section.addItems(item)
  })
})

//Класс открытия карточки на весь экран
const popupWithImage = new PopupWithImage(popupFullScreen);

const handleCardClick = (name, link) => {  
  popupWithImage.open(name, link);
}
popupWithImage.setEventListeners();


//Функция создания карточки.

function createCard(item) {
  const card = new Card (item, '#template', handleCardClick, (id) => {
    popupWithFormDelete.changeSubmitHandler(() => {
      api.deleteCard(id)
      .then(res => {
        card.deleteCard()
      })
    })
    popupWithFormDelete.open();
  })
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
  



const popupWithFormAdd = new PopupWithForm(popupElementAdd, {
  handlerFormSubmit: (data) => {
    
    api.addCard(data['place'], data.link)
    .then(res => {
      console.log('res', res)
      const item = createCard({
        name: res.name,
        link: res.link,
        likes: res.likes,
        id: res._id,
        userId: userId,
        ownerId: res.owner._id
        
      });
      section.addItems(item);
    })

    
  }
});
popupWithFormAdd.setEventListeners()



const popupWithFormEdit = new PopupWithForm(profilePopup, {
  handlerFormSubmit: (data) => {
    const {name, description} = data;
    api.editProfile(name, description)
    .then(() => {
    userInfo.setUserInfo(name, description);
  })
  }
});
const deletePopup = document.querySelector('.popup_type_delete_cards');
const deleteCard = document.querySelector('.card__button-delete');
const popupWithFormDelete = new PopupWithForm(deletePopup, {
  handlerFormSubmit: () => {
    api.deleteCard(id)
    .then(res => {
      console.log('res', res)
    })
  //console.log('delete')
  }
})
popupWithFormDelete.setEventListeners()

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

