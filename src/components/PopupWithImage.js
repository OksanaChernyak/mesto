import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector(".popup__pic");
    this._title = this._popupElement.querySelector(".popup__pic-title");
  }
  //перезаписывает родительский метод открытия, чтобы в попап вставлялась картинка и подпись
  openPopup(name, link) {
    this._image.src = link;
    this._title.textContent = name;
    this._image.alt = name;
    super.openPopup();
  }
}
