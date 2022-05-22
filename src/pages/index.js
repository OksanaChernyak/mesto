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
  avaButton,
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

// Один общий запрос для того, чтобы все элементы отобразились как надо, корректно
Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userServerData, cardsData]) => {
    userInfo.setUserInfo(userServerData);
    cardsList.renderSectionItems(cardsData);
  })
  .catch((err) => {
    alert(err);
  });

//создаем экземпляр секции, которая отвечает за отрисовку на странице
const cardsList = new Section(
  {
    renderer: createCard,
  },
  ".places"
);

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
  popupWithAvatarForm.renderLoading(true);
  api
    .changeAvatar(avatar)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupWithAvatarForm.closePopup();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupWithAvatarForm.renderLoading(false);
    });
}

//создадим экземпляр класса попапа с подтверждением удаления + слушатели
const popupWithDeleteVerification = new PopupWithConfirmation(
  handleRemoveSubmit,
  ".popup_type_delete"
);
popupWithDeleteVerification.setEventListeners();

//что происходит при нажатии на кнопку да в попапе подтверждения удаления
function handleRemoveSubmit(card) {
  popupWithDeleteVerification.renderLoading(true);
  api
    .deleteCard(card.cardId)
    .then(() => {
      card.removeCardFromServer();
      popupWithDeleteVerification.closePopup();
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
      popupWithDeleteVerification.renderLoading(false);
    });
}

//что происходит при нажатии на кнопку сохранения формы в попапе
function handleEditFormSubmit(data) {
  popupWithEditForm.renderLoading(true);
  api
    .changeUserData(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupWithEditForm.closePopup();
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
      popupWithEditForm.renderLoading(false);
    });
}

//что происходит при нажатии на кнопку создания новой карточки в попапе
function handleAddFormSubmit(data) {
  popupWithAddForm.renderLoading(true);
  api
    .addCardtoServer(data)
    .then((res) => {
      cardsList.setItem(createCard(res));
      popupWithAddForm.closePopup();
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
      popupWithAddForm.renderLoading(false);
    });
}

//что происходит при нажатии на картинку карточки - откроется большая картинка
function handleCardClick(name, link) {
  popupWithPicture.openPopup(name, link);
}

//что происходит при клике на лайк карточки - проверяем есть ли мой лайк
function handleLikeClick(card) {
  if (card.hasMyLike) {
    api
      .deleteLikeFromCard(card.cardId)
      .then((res) => {
        card.deleteMyLike(res.likes.length);
      })
      .catch((err) => {
        alert(err);
      });
  } else {
    api
      .addLikeToCard(card.cardId)
      .then((res) => {
        card.addMyLike(res.likes.length);
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
avaButton.addEventListener("click", () => {
  validationAvatar.resetValidation();
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
