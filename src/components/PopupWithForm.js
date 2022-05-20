import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  //принимает коллбэк сабмита формы, и принимает селектор конкретного попапа, как в родителе
  constructor(handleFormSubmit, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = document.querySelector(this._popupSelector);
    this._form = this._formElement.querySelector(".popup__container");
    this._submitButton = this._form.querySelector(".popup__save-button");
  }

  //собирает данные полей формы
  _getInputValues() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(".popup__field")
    );
    //создаем пустой объект
    this._formValues = {};
    //собираем в него значения всех полей из формы, с ключами объекта = атрибутами каждого инпута
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  //перезапишем родительские слушатели - добавим обработчик события формы
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  //метод изменения состояния кнопки сохранения
  renderLoading(isLoading) {
    this._permanentText = this._submitButton.textContent;

    if (isLoading) {
      this._submitButton.textContent = "Сохранение...";
    } else {
      this._submitButton.textContent = this._permanentText;
    }
  }

  //перезапишем родительский метод закрытия, чтобы сбрасывалась форма
  closePopup() {
    this._form.reset();
    super.closePopup();
  }
}
