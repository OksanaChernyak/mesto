export default class Card {
  //конструктор получает данные в виде объекта data
  // также получает селектор для дальнейшего выбора шаблона
  // третий параметр - функция, заполняющая попап с большой картинкой
  constructor(data, cardSelector, handlePicPopupOpen) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handlePicPopupOpen = handlePicPopupOpen;
  }

  //получили и склонировали разметку из template для карточки
  _getTemplate() {
    const newCard = document
      .querySelector(this._cardSelector)
      .content.querySelector(".place")
      .cloneNode(true);
    return newCard;
  }

  //сформируем карточку
  renderCard() {
    this._element = this._getTemplate();
    this._setCardActionsListeners();
    this._element.querySelector(".place__image").src = this._link;
    this._element.querySelector(".place__title").textContent = this._name;
    this._element.querySelector(".place__image").alt = this._name;
    return this._element;
  }

  //пакет слушателей кликов для каждой карточки
  _setCardActionsListeners() {
    this._element
      .querySelector(".place__like")
      .addEventListener("click", () => this._handleLikeClick());
    this._element
      .querySelector(".place__delete")
      .addEventListener("click", () => this._handleRemoveClick());
    this._element
      .querySelector(".place__image")
      .addEventListener("click", () =>
        this._handlePicPopupOpen(this._name, this._link)
      );
  }

  //что происходит при клике на лайк
  _handleLikeClick = () => {
    this._element
      .querySelector(".place__like")
      .classList.toggle("place__like_active");
  };

  //что происходит при клике на корзину
  _handleRemoveClick = () => {
    this._element.remove();
    this._element = null;
  };
}
