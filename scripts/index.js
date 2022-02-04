const popupElement = document.querySelector('.popup');
const popupContainer = document.querySelector('.popup__container');
const popupEditButton = document.querySelector('.button__edit-button');
const popupCloseButton = popupContainer.querySelector('.button__close');
const popupSaveButton = popupContainer.querySelector('.button__save');
const profileElement = document.querySelector('.profile');

const openPopup = function() {
  popupElement.classList.add('popup__container_opened');
};

const closePopup = function (evt) {
  evt.preventDefault()
  popupElement.classList.remove('popup__container_opened');
};

const closePopupByCkickOverlay = function(event) {
  if (event.target !== event.currentTarget){
    return;
}
  closePopup();
};

popupEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByCkickOverlay);

const formElement = document.querySelector('.popup__form-edit');
const nameInput = formElement.querySelector('.popup__input-name');
const jobInput = formElement.querySelector('.popup__input-description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
};

formElement.addEventListener('submit', formSubmitHandler);
