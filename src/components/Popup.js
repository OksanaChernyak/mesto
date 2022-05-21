import { ESC_CODE } from "../utils/constants.js";
export default class Popup {
  //получаает селектор конкретного попапа, одного. А это поведение одинаковое для каждого попапа.
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);

    //bind, иначе проиходит потеря контекста, ведь дальше мы closeOnEsc передали слушателю как коллбэк
    this._closeOnEsc = this._closeOnEsc.bind(this);
  }

  //метод открытие любого попапа
  openPopup() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._closeOnEsc);
  }

  //метод закрытие любого попапа
  closePopup() {
    document.removeEventListener("keydown", this._closeOnEsc);
    this._popupElement.classList.remove("popup_opened");
  }

  //закрытие по кнопке ESC
  _closeOnEsc(evt) {
    if (evt.keyCode === ESC_CODE) {
      this.closePopup();
    }
  }

  //закрытие по клику на оверлей
  _handleCloseOnOverlay(evt) {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close-button")
    ) {
      this.closePopup();
    }
  }

  //слушатели на кнопку закрытия каждого попапа и на зону оверлея
  setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      this._handleCloseOnOverlay(evt);
    });
  }
}
