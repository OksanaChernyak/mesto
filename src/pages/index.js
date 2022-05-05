import "./index.css";
import { initialCards } from "../utils/initialCards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {
  profileEditButton,
  containerEditFormSubmit,
  userNameInput,
  userDescriptionInput,
  userPlaceInput,
  userLinkInput,
  cardAddButton,
  containerAddFormSubmit,
  newCardSaveButton,
  config,
} from "../utils/constants.js";

//создаем экземпляр класса для каждой формы, передавая объект настроек и форму для валидации
const validationAdd = new FormValidator(config, containerAddFormSubmit);
const validationEdit = new FormValidator(config, containerEditFormSubmit);

//вызываем публичный метод на каждую форму
validationAdd.enableValidation();
validationEdit.enableValidation();

//создаем функцию для создания экземпляра класса карточки(рендерер для секции)
function createCard(data) {
  const newCard = new Card(
    data,
    handleCardClick,
    ".places-template_type_default"
  );
  //применяем публичный метод класса для непосредственного формирования карточки
  const newCardElement = newCard.renderCard();
  return newCardElement;
}

//создаем экземпляр класса, который отображает информацию о пользователе
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__subtitle",
});

//создаем экземпляр секции, которая отвечает за отрисовку на странице
const cardsList = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  ".places"
);

//использвуем публичный метод секции для отрисовки карточек
cardsList.renderSectionItems();

//создадим 2 экземпляра классов попапа с формой, и 1 экземпляр попапа с картинкой, а также навесим слушатели методом класса
const popupWithPicture = new PopupWithImage(".popup_type_image");
popupWithPicture.setEventListeners();

const popupWithEditForm = new PopupWithForm(
  handleEditFormSubmit,
  ".popup_type_edit-form"
);
popupWithEditForm.setEventListeners();

const popupWithAddForm = new PopupWithForm(
  handleAddFormSubmit,
  ".popup_type_add-form"
);
popupWithAddForm.setEventListeners();

//что происходит при нажатии на кнопку сохранения формы в попапе, обработчик
function handleEditFormSubmit(data) {
  userInfo.setUserInfo(data);
  popupWithEditForm.closePopup();
}

//что происходит при нажатии на кнопку создания новой карточки в попапе, обработчик
function handleAddFormSubmit(data) {
  cardsList.setItem(createCard(data));
  popupWithAddForm.closePopup();
}

//что происходит при нажатии на картинку карточки, обработчик
function handleCardClick(name, link) {
  popupWithPicture.openPopup(name, link);
}

//слушатель для клика на кнопку редактирования профиля
profileEditButton.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  userNameInput.value = name;
  userDescriptionInput.value = description;
  validationEdit.resetValidation();
  popupWithEditForm.openPopup();
});

//слушатель для клика на кнопку добавления новой карточки
cardAddButton.addEventListener("click", () => {
  validationAdd.resetValidation();
  popupWithAddForm.openPopup();
});
