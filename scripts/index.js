const initialCards = [
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

//Селекторы.

//Получение селекторов для попапа редактировать информацию в профиле.
const profilePopup = document.querySelector(".profile-popup");
const popupEditButton = document.querySelector(".profile__edit-button");
const nameElement = document.querySelector(".profile__name");
const jobElement = document.querySelector(".profile__description");

//Получение селекторов для инпутов.
const profileForm = document.querySelector(".popup__form-edit");
const nameInput = profileForm.querySelector(".popup__input-name");
const jobInput = profileForm.querySelector(".popup__input-description");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

//Получение селекторов для попапа добавить.
const popupButtonSubmit = document.querySelector('.popup__button-save_add')
const popupAddButton = document.querySelector(".profile__add-button");
const popupElementAdd = document.querySelector(".popup_add");
const popupElementContainerAdd = popupElementAdd.querySelector(
  ".popup__container_add"
);
const nameElementAdd = popupElementContainerAdd.querySelector(
  ".popup__input-name_add"
);
const linkElementAdd = popupElementContainerAdd.querySelector(
  ".popup__input-description_add"
);
const addForm = popupElementContainerAdd.querySelector(".popup__form-edit_add");

//Получение селекторов для попапа на весь экран.
const popupFullScreen = document.querySelector(".popup-FullScreen");
const popupImage = document.querySelector(".popup__img-FullScreen");
const popupImageName = document.querySelector(".popup__name-FullScreen");

//Получение селекторов для карточек(template)
const template = document.querySelector(".template").content;
const cardsElement = document.querySelector(".grid-cards");
const popups = document.querySelectorAll(".popup");
const cardName = document.querySelector(".card__name");

//Функции.

//Функция создания карточки.
function createCard(item) {
  const itemCard = template.cloneNode(true);
  const imageCard = itemCard.querySelector(".card__image");
  itemCard.querySelector(".card__name").textContent = item.name;
  imageCard.src = item.link;
  imageCard.alt = item.name;

  itemCard
    .querySelector(".card__button-delete")
    .addEventListener("click", handleDelete);
  itemCard.querySelector(".card__like").addEventListener("click", handelLike);
  itemCard.querySelector(".card__open-fullscreen").addEventListener("click", handleFullscreen);
  return itemCard;
}

function renderCard(item) {
  cardsElement.prepend(createCard(item));
}

//Функция Обхода массива карточек.
function renderCards(items) {
  items.forEach(renderCard);
}

renderCards(initialCards);

//Функция удаления карточки.
function handleDelete(evt) {
  evt.target.closest(".grid-cards__item").remove();
}

//Функция разворачивания на полный экран карточки.
function handleFullscreen(evt) {
  openPopup(popupFullScreen);
  const target = evt.target;
  popupImage.src = target.src;
  popupImage.alt = target.alt;
  popupImageName.textContent = target.alt;
}

//Функция лайка.
function handelLike(evt) {
  evt.target.classList.toggle("card__like_active");
}

//Функция для кнопки создать.
function handleAddFormSubmit() {
  renderCard({
    name: nameElementAdd.value,
    link: linkElementAdd.value,
  });
  addForm.reset();
  popupButtonSubmit.classList.add('popup__button-save_inactive')
  popupButtonSubmit.setAttribute("disabled", true);

  closePopup(popupElementAdd);
}

//Слушатель для кнопки создать.
addForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  handleAddFormSubmit();
});

//Функция открытия попапа.
function openPopup(popup) {
  document.addEventListener("keydown", closePopupEsc)
  popup.classList.add("popup_opened");
}

//Функция закрытия попапа.
function closePopup(popup) {
  document.removeEventListener("keydown", closePopupEsc)
  popup.classList.remove("popup_opened");
}

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

//Функция закрытия попапа на ESC.
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}

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
