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


//Получение селекторов для кнопок.
const popupElement = document.querySelector(".popup");
const popupContainer = document.querySelector(".popup__container");
const popupEditButton = document.querySelector(".profile__edit-button");
const popupCloseButton = popupContainer.querySelector(".popup__button-close");
const popupSaveButton = popupContainer.querySelector(".popap__button-save");
const profileElement = document.querySelector(".profile");
const nameElement = document.querySelector(".profile__name");
const jobElement = document.querySelector(".profile__description");

//Получение селекторов для инпутов.
const formElement = document.querySelector(".popup__form-edit");
const nameInput = formElement.querySelector(".popup__input-name");
const jobInput = formElement.querySelector(".popup__input-description");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

//Получение селекторов для попапа добавить.
const popupAddButton = document.querySelector(".profile__add-button");
const popupElementAdd = document.querySelector(".popup_add");
const popupElementContainerAdd = popupElementAdd.querySelector(".popup__container_add");
const popupElementCloseButtonAdd = popupElementContainerAdd.querySelector(".popup__button-close_add");
const popupElementSaveButtonAdd = popupElementContainerAdd.querySelector(".popup__button-save_add");
const nameElementAdd = popupElementContainerAdd.querySelector(".popup__input-name_add");
const linkElementAdd = popupElementContainerAdd.querySelector(".popup__input-description_add");
const formElementAdd = popupElementContainerAdd.querySelector(".popup__form-edit_add");

//Получение селекторов для попапа на весь экран.
const popupFullScreen = document.querySelector(".popup-FullScreen");
const popupFullScreenBtnClose = document.querySelector(".popup__close-FullScreen")

//Получение селекторов для карточек(template)
const template = document.querySelector(".template").content;
const cardsElement = document.querySelector(".grid-cards");
const fullscreenCard = document.querySelector(".card__open-fullscreen");
const cardImage = document.querySelector(".card__image");
const deleteCard = document.querySelector(".card__button-delete");


//Функции.

function renderCard(card) {
  const nameCard = template.cloneNode(true);
  nameCard.querySelector(".card__name").textContent = card.name;
  nameCard.querySelector(".card__image").src = card.link;
  cardsElement.prepend(nameCard);
}

function renderCard(initialCards) {
  const nameCard = template.cloneNode(true);

  nameCard.querySelector(".card__name").textContent = initialCards.name;
  nameCard.querySelector(".card__image").src = initialCards.link;
  nameCard.querySelector('.card__button-delete').addEventListener('click', handleDelete);
  nameCard.querySelector('.card__like').addEventListener('click', handelLike);
  nameCard.querySelector('.card__open-fullscreen').addEventListener('click', handleFullscreen)

  cardsElement.prepend(nameCard);
}

function addCard(name, link) {
  const nameCard = template.cloneNode(true);

  nameCard.querySelector(".card__name").textContent = name;
  nameCard.querySelector(".card__image").src = link;

  cardsElement.prepend(nameCard);
}

function renderCards(cards) {
  cards.forEach(renderCard);
};

renderCards(initialCards);

function handleDelete(event) {
  const itemElement = event.target.closest(".grid-cards__item")
  itemElement.remove();
};

function handleFullscreen(event) {
  const itemElement = document.querySelector('.popup-FullScreen').classList.add("popup_opened");
  const target = event.target;
  const cardName = document.querySelector(".card__name")
  const popupImage = document.querySelector(".popup__img-FullScreen");
  const popupImageName = document.querySelector(".popup__name-FullScreen");
  popupImage.src = target.src;
  popupImage.alt = cardName.textContent;
  popupImageName.textContent = cardName.textContent;
};

function handelLike (evt) {
  evt.target.classList.toggle('card__like_active');
}

function handleSubmit() {
  const name = nameElementAdd.value;
  const link = linkElementAdd.value;

  addCard(name, link);
}

formElementAdd.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSubmit();

});

//Функция открытия попапа редактировать
const openPopup = function () {
  const name = nameElement.textContent;
  const description = jobElement.textContent;
  nameInput.value = name;
  jobInput.value = description;
  popupElement.classList.add("popup_opened");
};

//Функция закрытия попапа.
const closePopup = function () {
  popupElement.classList.remove("popup_opened");
};

//Функция закрытия попапа на элемент вне попапа.
const closePopupByCkickOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup();
};

//Функция открытия попапа добавить
const openPopupAdd = function () {
  popupElementAdd.classList.add("popup_opened");
};

//функция закрытия попапа добавить
const closePopupAdd = function () {
  popupElementAdd.classList.remove("popup_opened");
};

//Функция закрытия попапа добавить на элемент вне попапа.
const closePopupAddByCkickOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopupAdd();
};

//Функция закрытия попапа на весь экран.
const closePopupFullscreen = function () {
  popupFullScreen.classList.remove("popup_opened");
};

const closePopupFullscreenByCkickOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopupFullscreen();
};

//Функция для кнопки сохранить и инпутов.
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
}

//Функция для кнопки создать.
function handleProfileFormSubmitAdd(evt) {
  evt.preventDefault();
  closePopupAdd();
};


//Слушатели.


//Слушатели для открытия и закрытия попапа редактировать.
popupEditButton.addEventListener("click", openPopup);
popupCloseButton.addEventListener("click", closePopup);
popupElement.addEventListener("click", closePopupByCkickOverlay);

//Слушатели для открытия и закрытия попапа добавить.
popupAddButton.addEventListener("click", openPopupAdd);
popupElementCloseButtonAdd.addEventListener("click", closePopupAdd);
popupElementAdd.addEventListener("click", closePopupAddByCkickOverlay);

//Слушатели кнопки создать и сохранить
formElementAdd.addEventListener("submit", handleProfileFormSubmitAdd);
formElement.addEventListener("submit", handleProfileFormSubmit);
//Закрытие попапа на весь экран.
popupFullScreenBtnClose.addEventListener("click", closePopupFullscreen);
popupFullScreen.addEventListener("click", closePopupFullscreenByCkickOverlay);
