import { Popup } from "./Popup.js";
import { popupImage, popupImageName } from '../utils/consts.js'



export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  };

  open(name, link) {
    popupImage.src = link;
    popupImage.alt = `Изображение ${name}`;
    popupImageName.textContent = name;
    super.open();
  }

}
