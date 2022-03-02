const popup = document.querySelector(".popup");
const profileOpenButton = document.querySelector(".profile__edit-button");
const profileCloseButton = popup.querySelector(".popup__close-button");
const formSubmit = document.querySelector(".popup__container");
let userName = document.querySelector(".profile__title");
let userDescription = document.querySelector(".profile__subtitle");
let userNameInput = popup.querySelector(".popup__field_type_name");
let userDescriptionInput = popup.querySelector(
  ".popup__field_type_description"
);

function openProfilePopup() {
  userNameInput.value = userName.textContent;
  userDescriptionInput.value = userDescription.textContent;
  popup.classList.add("popup_opened");
}

function closeProfilePopup() {
  popup.classList.remove("popup_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = userNameInput.value;
  userDescription.textContent = userDescriptionInput.value;
  closeProfilePopup();
}

profileOpenButton.addEventListener("click", openProfilePopup);

profileCloseButton.addEventListener("click", closeProfilePopup);

formSubmit.addEventListener("submit", handleProfileFormSubmit);
