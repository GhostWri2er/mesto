const popupElement = document.querySelector('.popup');
const popupContainer = document.querySelector('.popup__container');
const popupEditButton = document.querySelector('.button__edit-button');
const popupCloseButton = popupContainer.querySelector('.button__close');
const popupSaveButton = popupContainer.querySelector('.button__save');

const openPopup = function() {
  popupElement.classList.add('popup__container_opened');
};

const closePopup = function () {
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


