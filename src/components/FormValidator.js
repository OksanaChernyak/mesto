export default class FormValidator {
  //передаем объект настроек и форму для валидации
  constructor(configuration, form) {
    this._form = form;
    this._popupForm = configuration.popupForm;
    this._popupInputField = configuration.popupField;
    this._popupSaveButton = configuration.popupSaveButton;
    this._fieldError = configuration.popupFieldError;
    this._errorActive = configuration.errorActive;
    this._buttonDisabled = configuration.popupButtonDisabled;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._popupInputField)
    );
    this._saveBtn = this._form.querySelector(this._popupSaveButton);
  }

  //публичный метод, который можно вызвать извне класса
  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setInputListeners();
  }

  //добавить обработчики события инпут всем полям
  _setInputListeners() {
    this._toggleSaveButtonState();

    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._isValid(input);
        this._toggleSaveButtonState();
      });
    });
  }

  //показать и спрятать сообщения об ошибке
  _showInputError(input, errorMessage) {
    const formError = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._fieldError);
    formError.textContent = errorMessage;
    formError.classList.add(this._errorActive);
  }

  _hideInputError(input) {
    const formError = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._fieldError);
    formError.classList.remove(this._errorActive);
    formError.textContent = "";
  }

  //проверка на валидность, если невалидно, покажем ошибку
  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  //проверим, вдруг все поля валидны
  _hasInvalidField() {
    return this._inputList.some(function (input) {
      return !input.validity.valid;
    });
  }

  //состояние кнопки "сохранить", активно или нет
  _toggleSaveButtonState() {
    if (this._hasInvalidField()) {
      this._saveBtn.classList.add(this._buttonDisabled);
      this._saveBtn.disabled = true;
    } else {
      this._saveBtn.classList.remove(this._buttonDisabled);
      this._saveBtn.disabled = false;
    }
  }

  //метод для очистки ошибок и управления состоянием кнопки "сохранить"
  resetValidation() {
    this._toggleSaveButtonState();
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }
}
