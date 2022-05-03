import { Popup } from "./Popup.js";



export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupImage = popup.querySelector(".popup__img-FullScreen")
    this._popupImageName = popup.querySelector(".popup__name-FullScreen")
  };

  open(name, link) {
    super.open();
    this._popupImage.src = link;
    this._popupImage.alt = `Изображение ${name}`;
    this._popupImageName.textContent = name;
  }

}
