const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


//Селекторы.


//Получение селекторов для попапа редактировать информацию в профиле.
const profilePopup = document.querySelector('.profile-popup');
const popupContainer = document.querySelector(".popup__container");
const popupEditButton = document.querySelector(".profile__edit-button");
const profileCloseButton = popupContainer.querySelector(".popup__button-close");
const profileElement = document.querySelector(".profile");
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
const popupElementContainerAdd = popupElementAdd.querySelector(".popup__container_add");
const addCardCloseButton = popupElementContainerAdd.querySelector(".popup__button-close_add");
const nameElementAdd = popupElementContainerAdd.querySelector(".popup__input-name_add");
const linkElementAdd = popupElementContainerAdd.querySelector(".popup__input-description_add");
const addForm = popupElementContainerAdd.querySelector(".popup__form-edit_add");

//Получение селекторов для попапа на весь экран.
const popupFullScreen = document.querySelector(".popup-FullScreen");
const popupFullScreenBtnClose = document.querySelector(".popup__close-FullScreen");
const popupImage = document.querySelector(".popup__img-FullScreen");
const popupImageName = document.querySelector(".popup__name-FullScreen");

//Получение селекторов для карточек(template)
const template = document.querySelector(".template").content;
const cardsElement = document.querySelector(".grid-cards");
const fullscreenCard = document.querySelector(".card__open-fullscreen");
const cardImage = document.querySelector(".card__image");
const deleteCard = document.querySelector(".card__button-delete");


//Функции.

//Функция создания карточки.
function createCard(item) {
  const itemCard = template.cloneNode(true);
  const imageCard = itemCard.querySelector(".card__image");
  itemCard.querySelector(".card__name").textContent = item.name;
  imageCard.src = item.link;
  imageCard.alt = item.name;

  itemCard.querySelector('.card__button-delete').addEventListener('click', handleDelete);
  itemCard.querySelector('.card__like').addEventListener('click', handelLike);
  itemCard.querySelector('.card__open-fullscreen').addEventListener('click', handleFullscreen);
  return itemCard;
}

function renderCard(item) {
  cardsElement.prepend(createCard(item));
}

//Функция Обхода массива карточек.
function renderCards(items) {
  items.forEach(renderCard);
};

renderCards(initialCards);
//Функция удаления карточки.
function handleDelete(event) {
  const itemCard = event.target.closest(".grid-cards__item")
  itemCard.remove();
};
//Функция разворачивания на полный экран карточки.
function handleFullscreen(event) {
  const itemCard = document.querySelector('.popup-FullScreen').classList.add("popup_opened");
  const target = event.target;
  const cardName = target.closest(".grid-cards__item").querySelector(".card__name");
  popupImage.src = target.src;
  popupImage.alt = cardName.textContent;
  popupImageName.textContent = cardName.textContent;
};
//Функция лайка.
function handelLike (evt) {
  evt.target.classList.toggle('card__like_active');
}
//Функция для кнопки создать.
function handleAddFormSubmit() {
  renderCard({
    name: nameElementAdd.value,
    link: linkElementAdd.value,
  });

  nameElementAdd.value = "";
  linkElementAdd.value = "";
closePopup(popupElementAdd);
}
//Слушатель для кнопки создать.
addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleAddFormSubmit();
});

//Функция открытия попапа.
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

//Функция закрытия попапа.
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

//Функция открытия попапа редактировать
const openPopupProfile = function () {
  const name = nameElement.textContent;
  const description = jobElement.textContent;
  nameInput.value = name;
  jobInput.value = description;
  openPopup(profilePopup);
};

//Функция закрытия попапа.
const closePopupProfile = function () {
  closePopup(profilePopup);
};

//Функция закрытия попапа на элемент вне попапа.
const closePopupByCkickOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup(profilePopup);
};

//Функция открытия попапа добавить
const openPopupAdd = function () {
  openPopup(popupElementAdd);
};

//функция закрытия попапа добавить
const closePopupAdd = function () {
  closePopup(popupElementAdd);
};

//Функция закрытия попапа добавить на элемент вне попапа.
const closePopupAddByCkickOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup(popupElementAdd);
};

//Функция закрытия попапа на весь экран.
const closePopupFullscreen = function () {
  closePopup(popupFullScreen);
};

const closePopupFullscreenByCkickOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup(popupFullScreen);
};

//Функция для кнопки сохранить и инпутов.
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(profilePopup);
}

//Функция для кнопки создать.


//Слушатели.


//Слушатели для открытия и закрытия попапа редактировать.
popupEditButton.addEventListener("click", openPopupProfile);
profileCloseButton.addEventListener("click", closePopupProfile);
profilePopup.addEventListener("click", closePopupByCkickOverlay);

//Слушатели для открытия и закрытия попапа добавить.
popupAddButton.addEventListener("click", openPopupAdd);
addCardCloseButton.addEventListener("click", closePopupAdd);
popupElementAdd.addEventListener("click", closePopupAddByCkickOverlay);

//Слушатели кнопки создать и сохранить
profileForm.addEventListener("submit", handleProfileFormSubmit);
//Закрытие попапа на весь экран.
popupFullScreenBtnClose.addEventListener("click", closePopupFullscreen);
popupFullScreen.addEventListener("click", closePopupFullscreenByCkickOverlay);
