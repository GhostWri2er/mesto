import { Popup } from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popup, { handlerFormSubmit }) {
        super(popup);
        this._handlerFormSubmit = handlerFormSubmit;

        this._inputList = this._popup.querySelectorAll('.popup__input');

        this._button = popup.querySelector('.popup__button-save')
        this._text = this._button.textContent
    }
    _getInputValues() {
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

        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handlerFormSubmit(this._getInputValues());
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