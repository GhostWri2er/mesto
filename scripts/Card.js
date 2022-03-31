import {initialCards} from './InitialCards.js';

export class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  getTemplate() {
    const cardElement = document
    .querySelector('.template')
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement
  }

  generateCard() {
    this._element = this._getTemplate();


    this._element.querySelector('.card__name').textContent = this.name;
    this._element.querySelector('.card__image').src = this.link;
    this._element.querySelector('.card__image').alt = this.name;

    return this._element;
  }
}



