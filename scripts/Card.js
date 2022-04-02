import { popupImage, popupImageName, popupFullScreen } from './consts.js';
import { openPopup } from './utils.js'
import {initialCards} from './InitialCards.js';

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._template = document.querySelector(cardSelector).content;
  };

  _handelLike = () => {
    this._likeButton.classList.toggle("card__like_active");
  };

  _handleDelete = () => {
    this._itemCard.remove();
  }

  _handleFullscreen = () => {
    const target = evt.target;
    popupImage.src = target.src;
    popupImage.alt = target.alt;
    popupImageName.textContent = target.alt;
    openPopup(popupFullScreen);
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", this._handleDelete());
    this._likeButton.addEventListener("click", this._handelLike());
    this._imageCard.addEventListener("click", this._handleFullscreen());
  }

  getCardElement () {
    //Нашли
    this._itemCard = this._template.cloneNode(true);
    this._imageCard = this._itemCard.querySelector(".card__image");
    this._deleteButton = this._itemCard.querySelector(".card__button-delete");
    this._likeButton = this._itemCard.querySelector(".card__like");

    //Заполнили
    this._itemCard.querySelector(".card__name").textContent = this._name;
    this._imageCard.src = this._link;
    this._imageCard.alt = this._name;

    this._setEventListeners();

    //Вернули
    return this._itemCard;

  };

};



