import { Popup } from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { handlerFormSubmit }) {
        super(popupSelector);
        this._handlerFormSubmit = handlerFormSubmit;

        this._button = popupSelector.querySelector('.popup__button-save')
        this._text = this._button.textContent
    }
    _getInputValues() {
        this._inputList = this._popupSelector.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
          });
          return this._formValues;
    }

    changeSubmitHandler(newSubmitHandler) {
        this._handlerFormSubmit = newSubmitHandler;
    }

    setEventListeners() {
        super.setEventListeners();

        this._popupSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handlerFormSubmit(this._getInputValues());
            this.close()
          });
    }

    loading(loading) {
        if(loading) {
            this._button.textContent = 'Сохранение...'
        } else {
            this._button.textContent = this._text
        }
      }
}