const popupEditForm = document.querySelector(".popup__edit-form");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileCloseButton = popupEditForm.querySelector(".popup__close-button");
const editFormSubmit = document.querySelector(".popup__container_type_edit");
const userName = document.querySelector(".profile__title");
const userDescription = document.querySelector(".profile__subtitle");
const popupAddForm = document.querySelector(".popup__add-form");
let userNameInput = popupEditForm.querySelector(".popup__field_type_name");
let userDescriptionInput = popupEditForm.querySelector(
  ".popup__field_type_description"
);
let userPlaceInput = popupAddForm.querySelector(".popup__field_type_place");
let userLinkInput = popupAddForm.querySelector(".popup__field_type_link");
const cardAddButton = document.querySelector(".profile__add-button");
const cardCloseButton = popupAddForm.querySelector(".popup__close-button");
const addFormSubmit = document.querySelector(".popup__container_type_add");
const cardsList = document.querySelector(".places");
const popupPicContainer = document.querySelector(".popup__pic");
const picCloseButton = popupPicContainer.querySelector(
  ".popup__close-button_type_pic"
);

const initialCards = [
  {
    name: "Чусовая",
    link: "https://images.unsplash.com/photo-1623241034180-dd74f4bff7b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3216&q=80",
  },
  {
    name: "Богданович",
    link: "https://images.unsplash.com/photo-1592577495540-60f4b9270c6d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
  },
  {
    name: "Иремель",
    link: "https://images.unsplash.com/photo-1593191983539-51b5d75529ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80",
  },
  {
    name: "Конжаковский камень",
    link: "https://images.unsplash.com/photo-1626876990243-533c63943aa0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80",
  },
  {
    name: "Кыштым",
    link: "https://images.unsplash.com/photo-1647345691519-4e0bcccf95cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
  },
  {
    name: "Таганай",
    link: "https://images.unsplash.com/photo-1625589934405-a180c2e53aa5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
  },
];

initialCards.forEach(function (el) {
  makeCard(el.name, el.link);
});

function openProfilePopup() {
  userNameInput.value = userName.textContent;
  userDescriptionInput.value = userDescription.textContent;
  popupEditForm.classList.add("popup_opened");
}

function closeProfilePopup() {
  popupEditForm.classList.remove("popup_opened");
}

function saveProfileForm(evt) {
  evt.preventDefault();
  userName.textContent = userNameInput.value;
  userDescription.textContent = userDescriptionInput.value;
  closeProfilePopup();
}

function openAddCardPopup() {
  popupAddForm.classList.add("popup_opened");
}

function closeAddCardPopup() {
  popupAddForm.classList.remove("popup_opened");
}

function makeCard(name, link) {
  const newCard = document
    .querySelector(".places-template")
    .content.firstElementChild.cloneNode(true);
  newCard.querySelector(".places__title").textContent = name;
  newCard.querySelector(".places__image").src = link;
  newCard.querySelector(".places__image").alt = name;

  setCardActionsListeners(newCard, name, link);
  cardsList.prepend(newCard);
}

function addNewCard(evt) {
  evt.preventDefault();
  makeCard(userPlaceInput.value, userLinkInput.value);
  userPlaceInput.value = null;
  userLinkInput.value = null;

  closeAddCardPopup();
}

function removeCard(evt) {
  const newCard = evt.currentTarget.closest(".places__item");
  newCard.remove();
}

function setCardActionsListeners(newCard, name, link) {
  newCard
    .querySelector(".places__delete")
    .addEventListener("click", removeCard);

  newCard
    .querySelector(".places__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("places__like_active");
    });

  newCard
    .querySelector(".places__image")
    .addEventListener("click", () => openPicPopup(name, link));
}

function openPicPopup(name, link) {
  const popupPic = popupPicContainer.querySelector(".popup__image");
  const popupPicTitle = popupPicContainer.querySelector(".popup__pic-title");
  popupPic.src = link;
  popupPicTitle.textContent = name;
  popupPicTitle.alt = name;
  popupPicContainer.classList.add("popup_opened");
}

function closePicPopup() {
  popupPicContainer.classList.remove("popup_opened");
}

profileEditButton.addEventListener("click", openProfilePopup);
profileCloseButton.addEventListener("click", closeProfilePopup);
editFormSubmit.addEventListener("submit", saveProfileForm);
addFormSubmit.addEventListener("submit", addNewCard);
cardAddButton.addEventListener("click", openAddCardPopup);
cardCloseButton.addEventListener("click", closeAddCardPopup);
picCloseButton.addEventListener("click", closePicPopup);
