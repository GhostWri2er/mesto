import './index.css';
import { FormValidator } from '../components/FormValidator.js';
import { popupFullScreen, objectValidation, profilePopup, popupEditButton, nameInput, jobInput, popupAddButton, popupElementAdd, addForm, deletePopup, editAvatar, editAvatarButton, avatarForm } from '../utils/consts.js';
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
//Получаем данные профиля.

let userId;
api.getProfile()
.then(res => {
  userInfo.setUserInfo(res.name, res.about, res.avatar)
  userId = res._id
});

//Получаем карточки.
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
      .then(() => {
        card.deleteCard()
      })
    })
    popupWithFormDelete.open();
  },
  (id) => {
    if(card.isLiked()) {
      api.deleteLike(id)
      .then(res => {
      card.setLikes(res.likes)
    })
    } else {
      api.addLike(id)
      .then(res => {
      card.setLikes(res.likes)
    })
    }
    

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
  


//Попап добавления карточки.
const popupWithFormAdd = new PopupWithForm(popupElementAdd, {
  handlerFormSubmit: (data) => {
    console.log(data)
    popupWithFormAdd.loading(true)
    api.addCard(data['place'], data.link)
    .then(res => {
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
    .finally( () => popupWithFormAdd.loading(false))

    
  }
});
popupWithFormAdd.setEventListeners()


//Попап редактирования профиля.
const popupWithFormEdit = new PopupWithForm(profilePopup, {
  handlerFormSubmit: (data) => {
    popupWithFormEdit.loading(true)
    const {name, description} = data;
    api.editProfile(name, description)
    .then(() => {
    userInfo.setUserInfo(name, description);
  })
  .finally( () => popupWithFormEdit.loading(false))
  }
});

//Попап удаления карточки.
const popupWithFormDelete = new PopupWithForm(deletePopup, {
  handlerFormSubmit: () => {
    popupWithFormDelete.loading(true)
    api.deleteCard(id)
    .then(res => {
      console.log('res', res)
    })
    .finally( () => popupWithFormDelete.loading(false))
  }
});
popupWithFormDelete.setEventListeners()


//Попап редактирование аватара
const popupWithFormEditAvatar = new PopupWithForm(editAvatar, {
  handlerFormSubmit: (data) => {
    popupWithFormEditAvatar.loading(true)
    const {link} = data; 
    api.updateAvatar(link)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar)
    })
    .finally( () => popupWithFormEditAvatar.loading(false))
}
})
popupWithFormEditAvatar.setEventListeners()

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

//Кнопка редактировать аватар.
editAvatarButton.addEventListener("click", () =>{
  popupWithFormEditAvatar.open()
  avatarForm.reset();
  avatarValidator.resetValidation();
  avatarValidator.disabledSubmitButton();

})



// Класс UserInfo
const userInfo = new UserInfo ({ userName: ".profile__name",  aboutUser: ".profile__description", userAvatar: '.profile__avatar' })

//Классы Валидации форм
const editProfileValidator = new FormValidator(objectValidation, profilePopup);
const addCardValidator = new FormValidator(objectValidation, popupElementAdd);
const avatarValidator = new FormValidator(objectValidation, editAvatar);

//Вызов валидации на попапах.
editProfileValidator.enableValidation();
addCardValidator.enableValidation();
avatarValidator.enableValidation();

