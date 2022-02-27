let popup = document.querySelector('.popup');
let openPopup = document.querySelector('.profile__edit-button');
let closePopup = popup.querySelector('.popup__close-button');
let formSubmit = document.querySelector('.popup__container');
let userName = document.querySelector('.profile__title');
let userDescription = document.querySelector('.profile__subtitle');
let userNameInput = popup.querySelector('.popup__field_type_name');
let userDescriptionInput = popup.querySelector('.popup__field_type_description');

function formSubmitHandler (evt) {
  evt.preventDefault();
  userName.textContent = userNameInput.value;
  userDescription.textContent = userDescriptionInput.value;
  popup.classList.toggle('popup__opened');
};

openPopup.addEventListener('click', function() {
  popup.classList.add('popup__opened')
});

closePopup.addEventListener('click', function() {
  popup.classList.toggle('popup__opened')
});

formSubmit.addEventListener('submit', formSubmitHandler);
