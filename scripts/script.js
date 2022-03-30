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
const saveAddFormButton = containerAddFormSubmit.querySelector(
  ".popup__save-button_type_add-form"
);

//перебор массива
initialCards.forEach(function (el) {
  renderCard(el.name, el.link);
});

//сохранение формы профиля при нажатии сохранить
function saveProfileForm(evt) {
  evt.preventDefault();
  userName.textContent = userNameInput.value;
  userDescription.textContent = userDescriptionInput.value;
  closePopup(popupEditForm);
}

//формирование карточки
function makeCard(name, link) {
  const newCard = document
    .querySelector(".places-template")
    .content.cloneNode(true);
  const newCardImage = newCard.querySelector(".places__image");
  const newCardTitle = newCard.querySelector(".places__title");
  newCardTitle.textContent = name;
  newCardImage.src = link;
  newCardImage.alt = name;
  setCardActionsListeners(newCard, name, link);
  return newCard;
}

//создание и вставка карточки в разметку
function renderCard(name, link) {
  newCard = makeCard(name, link);
  cardsList.prepend(newCard);
}

//сохранение новой карточки при нажатии создать
function addNewCard(evt) {
  evt.preventDefault();
  newCard = renderCard(userPlaceInput.value, userLinkInput.value);
  userPlaceInput.value = "";
  userLinkInput.value = "";
  closePopup(popupAddForm);
  /* в данном случае я дублирую код из функции toggleSaveButtonState, т.к. не могу передать ей аргументы, которые требуются функции,
  т.к. они не существуют в глобальной области видимости. Для этого придется вынести объект в отдельную константу, а также глобально создать массив inputList*/
  saveAddFormButton.classList.add("popup__save-button_disabled");
  saveAddFormButton.disabled = true;
}

//удаление карточки
function removeCard(evt) {
  const newCard = evt.currentTarget.closest(".places__item");
  newCard.remove();
}

//пакет слушателей для каждой карточки
function setCardActionsListeners(newCard, name, link) {
  newCard
    .querySelector(".places__delete")
    .addEventListener("click", removeCard);

  newCard
    .querySelector(".places__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("places__like_active");
    });

  newCard.querySelector(".places__image").addEventListener("click", () => {
    openPopup(containerPopupPic);
    popupPic.src = link;
    popupPicTitle.textContent = name;
    popupPic.alt = name;
  });
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

profileEditButton.addEventListener("click", function () {
  openPopup(popupEditForm);
  userNameInput.value = userName.textContent;
  userDescriptionInput.value = userDescription.textContent;
});
profileCloseButton.addEventListener("click", function () {
  closePopup(popupEditForm);
});

containerEditFormSubmit.addEventListener("submit", saveProfileForm);
containerAddFormSubmit.addEventListener("submit", addNewCard);

cardAddButton.addEventListener("click", function () {
  openPopup(popupAddForm);
});
cardCloseButton.addEventListener("click", function () {
  closePopup(popupAddForm);
});
picCloseButton.addEventListener("click", function () {
  closePopup(containerPopupPic);
});
