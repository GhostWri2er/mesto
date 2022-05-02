import { Popup } from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { handlerFormSubmit }) {
        super(popupSelector);
        this._handlerFormSubmit = handlerFormSubmit;
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
}