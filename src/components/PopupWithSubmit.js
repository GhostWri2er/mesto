import { Popup } from "./Popup.js";

class PopupWithSubmit extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
          });
    }
}