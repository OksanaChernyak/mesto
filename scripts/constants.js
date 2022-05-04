export {
  profileEditButton,
  containerEditFormSubmit,
  userName,
  userNameInput,
  userDescriptionInput,
  userPlaceInput,
  userLinkInput,
  cardAddButton,
  containerAddFormSubmit,
  ESC_CODE,
  newCardSaveButton,
  config,
};
const popupEditForm = document.querySelector(".popup_type_edit-form");
const profileEditButton = document.querySelector(".profile__edit-button");
const containerEditFormSubmit = document.querySelector(
  ".popup__container_type_edit"
);
const userName = document.querySelector(".profile__title");

const popupAddForm = document.querySelector(".popup_type_add-form");
const userNameInput = popupEditForm.querySelector(".popup__field_type_name");
const userDescriptionInput = popupEditForm.querySelector(
  ".popup__field_type_description"
);
const userPlaceInput = popupAddForm.querySelector(".popup__field_type_place");
const userLinkInput = popupAddForm.querySelector(".popup__field_type_link");
const cardAddButton = document.querySelector(".profile__add-button");
const containerAddFormSubmit = document.querySelector(
  ".popup__container_type_add"
);

const ESC_CODE = 27;
const newCardSaveButton = containerAddFormSubmit.querySelector(
  ".popup__save-button"
);

//объект с настройками
const config = {
  popupForm: ".popup__container",
  popupField: ".popup__field",
  popupSaveButton: ".popup__save-button",
  popupFieldError: "popup__field_type_error",
  errorActive: "error_active",
  popupButtonDisabled: "popup__save-button_disabled",
};
