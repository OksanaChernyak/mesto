import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const popupEditForm = document.querySelector(".popup_type_edit-form");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileCloseButton = popupEditForm.querySelector(".popup__close-button");
const containerEditFormSubmit = document.querySelector(
  ".popup__container_type_edit"
);
const userName = document.querySelector(".profile__title");
const userDescription = document.querySelector(".profile__subtitle");
const popupAddForm = document.querySelector(".popup_type_add-form");
const userNameInput = popupEditForm.querySelector(".popup__field_type_name");
const userDescriptionInput = popupEditForm.querySelector(
  ".popup__field_type_description"
);
const userPlaceInput = popupAddForm.querySelector(".popup__field_type_place");
const userLinkInput = popupAddForm.querySelector(".popup__field_type_link");
const cardAddButton = document.querySelector(".profile__add-button");
const cardCloseButton = popupAddForm.querySelector(".popup__close-button");
const containerAddFormSubmit = document.querySelector(
  ".popup__container_type_add"
);
const cardsList = document.querySelector(".places");
const containerPopupPic = document.querySelector(".popup_type_image");
const picCloseButton = containerPopupPic.querySelector(
  ".popup__close-button_type_pic"
);
const popupPic = containerPopupPic.querySelector(".popup__pic");
const popupPicTitle = containerPopupPic.querySelector(".popup__pic-title");
const ESC_CODE = 27;
const newCardSaveButton = containerAddFormSubmit.querySelector(
  ".popup__save-button"
);

//обходим массив, создаем экземпляр класса кард
initialCards.forEach((el) => {
  const card = new Card(
    el,
    ".places-template_type_default",
    handlePicPopupOpen
  );
  const newCard = card.renderCard();
  cardsList.prepend(newCard);
});

//сохранение формы профиля при нажатии сохранить
function saveProfileForm(evt) {
  evt.preventDefault();
  userName.textContent = userNameInput.value;
  userDescription.textContent = userDescriptionInput.value;
  closePopup(popupEditForm);
}

//сохранение новой карточки при нажатии создать
function addNewCard(evt) {
  evt.preventDefault();
  //создала объект с настройками для передачи в класс кард
  const userDataCard = {
    name: userPlaceInput.value,
    link: userLinkInput.value,
  };
  //создаем экземпляр класса кард
  const card = new Card(
    userDataCard,
    ".places-template_type_default",
    handlePicPopupOpen
  );
  //использовала публичный метод класса
  const newCard = card.renderCard();
  userPlaceInput.value = "";
  userLinkInput.value = "";
  newCardSaveButton.classList.add("popup__save-button_disabled");
  newCardSaveButton.disabled = true;
  cardsList.prepend(newCard);
  closePopup(popupAddForm);
}

//открытие попапа с большой картинкой
function handlePicPopupOpen(name, link) {
  openPopup(containerPopupPic);
  popupPic.src = link;
  popupPicTitle.textContent = name;
  popupPic.alt = name;
}

//открытие и закрытие
function openPopup(elem) {
  elem.classList.add("popup_opened");
  document.addEventListener("keydown", closeOnEsc);
}

function closePopup(elem) {
  document.removeEventListener("keydown", closeOnEsc);
  elem.classList.remove("popup_opened");
}

//закрытие по кнопке Esc
function closeOnEsc(evt) {
  if (evt.which === ESC_CODE) {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
  }
}

//закрытие по клику на оверлей в любом месте, кропе попапа
function closeOnOverlay() {
  const overlayList = Array.from(document.querySelectorAll(".popup"));
  overlayList.forEach(function (overlay) {
    overlay.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("popup__close-button")
      ) {
        closePopup(overlay);
      }
    });
  });
}

closeOnOverlay();

//слушатели для кликов на элементы профиля - кнопку редактирования и закрытие попапа
profileEditButton.addEventListener("click", function () {
  openPopup(popupEditForm);
  userNameInput.value = userName.textContent;
  userDescriptionInput.value = userDescription.textContent;
});
profileCloseButton.addEventListener("click", function () {
  closePopup(popupEditForm);
});

//слушатели на событие сабмит для каждого из попапов
containerEditFormSubmit.addEventListener("submit", saveProfileForm);
containerAddFormSubmit.addEventListener("submit", addNewCard);

//слушатели для кликов на элементы добавления карточки и закрытия попапа добавления карточки
cardAddButton.addEventListener("click", function () {
  openPopup(popupAddForm);
});
cardCloseButton.addEventListener("click", function () {
  closePopup(popupAddForm);
});

//слушатель на кнопку закрытия попапа с картинкой
picCloseButton.addEventListener("click", function () {
  closePopup(containerPopupPic);
});

//объект с настройками
const config = {
  popupForm: ".popup__container",
  popupField: ".popup__field",
  popupSaveButton: ".popup__save-button",
  popupFieldError: "popup__field_type_error",
  errorActive: "error_active",
  popupButtonDisabled: "popup__save-button_disabled",
};

//создаем экземпляр класса для каждой формы, передавая объект настроек и форму для валидации
const validationAdd = new FormValidator(config, containerAddFormSubmit);
const validationEdit = new FormValidator(config, containerEditFormSubmit);

//вызываем публичный метод на каждую форму
validationAdd.enableValidation();
validationEdit.enableValidation();
