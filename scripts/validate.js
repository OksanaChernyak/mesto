//выбираем все формы и добавляем им всем обработчики
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.popupForm));
  formList.forEach(function (form) {
    form.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setInputListeners(form, config);
  });
}

//добавить обработчики события инпут всем полям
function setInputListeners(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.popupField));
  const saveButton = form.querySelector(config.popupSaveButton);

  toggleSaveButtonState(inputList, saveButton, config);

  inputList.forEach(function (input) {
    input.addEventListener("input", function () {
      isValid(form, input, config);
      toggleSaveButtonState(inputList, saveButton, config);
    });
  });
}

//показать сообщение об ошибке
function showInputError(form, input, errorMessage, config) {
  const formError = form.querySelector(`.${input.id}-error`);
  input.classList.add(config.popupFieldError);
  formError.textContent = errorMessage;
  formError.classList.add(config.errorActive);
}

//спрятать сообщение об ошибке
function hideInputError(form, input, config) {
  const formError = form.querySelector(`.${input.id}-error`);
  input.classList.remove(config.popupFieldError);
  formError.classList.remove(config.errorActive);
  formError.textContent = "";
}

//проверка на валидность, если невалидно, покажем ошибку
function isValid(form, input, config) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, config);
  } else {
    hideInputError(form, input, config);
  }
}

//проверим, вдруг все поля валидны
function hasInvalidField(inputList) {
  return inputList.some(function (input) {
    return !input.validity.valid;
  });
}

//состояние кнопки сохранить
function toggleSaveButtonState(inputList, saveButton, config) {
  if (hasInvalidField(inputList, config)) {
    saveButton.classList.add(config.popupButtonDisabled);
    saveButton.disabled = true;
  } else {
    saveButton.classList.remove(config.popupButtonDisabled);
    saveButton.disabled = false;
  }
}

//получает объект с параметрами
enableValidation({
  popupForm: ".popup__container",
  popupField: ".popup__field",
  popupSaveButton: ".popup__save-button",
  popupFieldError: "popup__field_type_error",
  errorActive: "error_active",
  popupButtonDisabled: "popup__save-button_disabled",
});
