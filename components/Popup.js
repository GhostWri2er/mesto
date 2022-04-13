export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    document.addEventListener("keydown", _handleEscClose(evt))
    this._popupSelector.classList.add("popup_opened");
  }

  close() {
    document.removeEventListener("keydown", _handleEscClose(evt))
    this._popupSelector.classList.remove("popup_opened");
  }

  _handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        this.close()
    }
  }

  setEventListeners() {
    this._popupSelector.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close()
      }
      if (evt.target.classList.contains("popup__close")) {
        this.close()
      }
    });
  }
}
