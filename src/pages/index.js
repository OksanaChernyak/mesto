import "./index.css";
import { initialCards } from "../utils/initialCards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  profileEditButton,
  containerEditFormSubmit,
  userNameInput,
  userDescriptionInput,
  cardAddButton,
  containerAddFormSubmit,
  config,
  ava,
  containerAvatarFormSubmit,
} from "../utils/constants.js";

//создадим экземпляр класса апи для работы с запросами на сервер
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-41/",
  headers: {
    authorization: "d9af2d99-485f-4815-ad38-c00dc8b82856",
    "content-Type": "application/json",
  },
});

//получим карточки с сервера
const cards = api.getInitialCards();

cards
  .then((data) => {
    //создаем экземпляр секции, которая отвечает за отрисовку на странице
    const cardsList = new Section(
      {
        items: data,
        renderer: createCard,
      },
      ".places"
    );
    //использвуем публичный метод секции для отрисовки карточек
    cardsList.renderSectionItems();
  })
  .catch((err) => {
    alert(err);
  });

//создаем экземпляр класса для каждой формы, передавая объект настроек и форму для валидации
const validationAdd = new FormValidator(config, containerAddFormSubmit);
const validationEdit = new FormValidator(config, containerEditFormSubmit);
const validationAvatar = new FormValidator(config, containerAvatarFormSubmit);

//вызываем публичный метод на каждую форму
validationAdd.enableValidation();
validationEdit.enableValidation();
validationAvatar.enableValidation();

//создаем экземпляр класса, который отображает информацию о пользователе
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__subtitle",
  avatarSelector: ".profile__pic",
});

//создаем функцию для создания экземпляра класса карточки(рендерер для секции)
function createCard(data) {
  const newCard = new Card(
    data,
    handleCardClick,
    handleLikeClick,
    handleTrashBinClick,
    ".places-template_type_default",
    userInfo.returnMyId()
  );
  //применяем публичный метод класса для непосредственного формирования карточки
  const newCardElement = newCard.renderCard();
  return newCardElement;
}

//отправим запрос на получение инфо о пользователе
const userServerData = api.getUserData();
userServerData
  .then((data) => {
    userInfo.setUserInfo(data);
  })
  .catch((err) => console.log(err));

//создадим экземпляр класса попапа с картинкой + слушатели
const popupWithPicture = new PopupWithImage(".popup_type_image");
popupWithPicture.setEventListeners();

//создадим экземпляр класса попапа с формой для редиктирования профиля + слушатели
const popupWithEditForm = new PopupWithForm(
  handleEditFormSubmit,
  ".popup_type_edit-form"
);
popupWithEditForm.setEventListeners();

//создадим экземпляр класса попапа с формой для добавления нового места + слушатели
const popupWithAddForm = new PopupWithForm(
  handleAddFormSubmit,
  ".popup_type_add-form"
);
popupWithAddForm.setEventListeners();

//создадим экземпляр класса попапа с формой для смены аватара + слушатели
const popupWithAvatarForm = new PopupWithForm(
  handleAvatarFormSubmit,
  ".popup_type_avatar-form"
);
popupWithAvatarForm.setEventListeners();

//при клике на кнопку сохранить, аватар отправится на сервер
function handleAvatarFormSubmit(avatar) {
  api
    .changeAvatar(avatar)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupWithAvatarForm.closePopup();
    })
    .catch((err) => console.log(err));
}

//создадим экземпляр класса попапа с подтверждением удаления + слушатели
const popupWithDeleteVerification = new PopupWithConfirmation(
  handleRemoveSubmit,
  ".popup_type_delete"
);
popupWithDeleteVerification.setEventListeners();

//что происходит при нажатии на кнопку да в попапе подтверждения удаления
function handleRemoveSubmit(card) {
  api
    .deleteCard(card._cardId)
    .then(() => {
      card.removeCardFromServer();
      popupWithDeleteVerification.closePopup();
    })
    .catch((err) => {
      alert(err);
    });
}

//что происходит при нажатии на кнопку сохранения формы в попапе
function handleEditFormSubmit(data) {
  userInfo.setUserInfo(data);
  api.changeUserData(data);
  popupWithEditForm.closePopup();
}

//что происходит при нажатии на кнопку создания новой карточки в попапе
function handleAddFormSubmit(data) {
  api
    .addCardtoServer(data)
    .then(() => popupWithAddForm.closePopup())
    .catch((err) => {
      alert(err);
    });
}

//что происходит при нажатии на картинку карточки
function handleCardClick(name, link) {
  popupWithPicture.openPopup(name, link);
}

//что происходит при клике на лайк карточки
function handleLikeClick(card, hasMyLike) {
  if (hasMyLike) {
    api
      .deleteLike(card._cardId)
      .then((res) => {
        card.deleteMyLike(res.likes);
      })
      .catch((err) => {
        alert(err);
      });
  } else {
    api
      .likeCard(card._cardId)
      .then((res) => {
        card.addMyLike(res.likes);
      })
      .catch((err) => {
        alert(err);
      });
  }
}

//что происходит при клике на корзину - открывается попап подтверждения удаления
function handleTrashBinClick(card) {
  popupWithDeleteVerification.openPopup(card);
}

//слушатель клика на аватарку
ava.addEventListener("click", () => {
  popupWithAvatarForm.openPopup();
});

//слушатель для клика на кнопку редактирования профиля
profileEditButton.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  userNameInput.value = name;
  userDescriptionInput.value = about;
  validationEdit.resetValidation();
  popupWithEditForm.openPopup();
});

//слушатель для клика на кнопку добавления новой карточки
cardAddButton.addEventListener("click", () => {
  validationAdd.resetValidation();
  popupWithAddForm.openPopup();
});
