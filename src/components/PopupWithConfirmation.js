import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(handleFormSubmit, popupSelector) {
    super(popupSelector);
    this._form = this._popupElement.querySelector(".popup__delete-container");
    this._submitButton = this._form.querySelector(".popup__save-button");
    this._handleFormSubmit = handleFormSubmit;
    this._permanentText = this._submitButton.textContent;
  }

  //при открытии попапа обозначим карточку
  openPopup(card) {
    super.openPopup();
    this._card = card;
  }

  //метод изменения состояния кнопки сохранения
  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Удаление...";
    } else {
      this._submitButton.textContent = this._permanentText;
    }
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
