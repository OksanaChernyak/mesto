import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(handleFormSubmit, popupSelector) {
    super(popupSelector);
    this._formElement = document.querySelector(this._popupSelector);
    this._form = this._formElement.querySelector(".popup__delete-container");
    this._handleFormSubmit = handleFormSubmit;
  }

  //при открытии попапа обозначим карточку
  openPopup(card) {
    super.openPopup();
    this._card = card;
  }

  //не передаем инпуты, передаем карточку
  setEventListeners() {    
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._card);
    });
    super.setEventListeners();
  } 
}