export default class Card {
  // конструктор получает данные в виде объекта data
  // также получает функцию, описывающее что происходит при нажатии на карточку
  // также получает селектор для дальнейшего выбора шаблона

  constructor(data, handleCardClick, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  //получает и клонирует разметку из template для карточки
  _getTemplate() {
    const newCard = document
      .querySelector(this._cardSelector)
      .content.querySelector(".place")
      .cloneNode(true);
    return newCard;
  }

  //формирует карточку
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
        this._handleCardClick(this._name, this._link)
      );
  }

  //что происходит при клике на лайк, обработчик
  _handleLikeClick = () => {
    this._element
      .querySelector(".place__like")
      .classList.toggle("place__like_active");
  };

  //что происходит при клике на корзину, обработчик
  _handleRemoveClick = () => {
    this._element.remove();
    this._element = null;
  };
}
