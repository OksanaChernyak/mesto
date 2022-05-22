export default class Card {
  // конструктор получает данные в виде объекта data
  // также получает функцию, описывающее что происходит при нажатии на карточку
  // также получает селектор для дальнейшего выбора шаблона

  constructor(
    data,
    handleCardClick,
    handleLikeClick,
    handleTrashBinClick,
    cardSelector,
    userId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this.cardId = data._id;
    this._likes = data.likes;
    this._myId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleTrashBinClick = handleTrashBinClick;
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
    this._image = this._element.querySelector(".place__image");
    this._title = this._element.querySelector(".place__title");
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;
    this._trashBin = this._element.querySelector(".place__delete");
    this._likeCounter = this._element.querySelector(".place__like-counter");
    //отобразим длину массива как счетчик лайков
    this._likeCounter.textContent = this._likes.length;
    this._likeBtn = this._element.querySelector(".place__like");
    //логика того, как проверяется есть ли мой лайк
    this.hasMyLike = this._likes.some((like) => like._id === this._myId);

    //если айди создателя не совпадает с мои айди, то корзинку удалим
    if (this._ownerId != this._myId) {
      this._trashBin.remove();
    }

    //если в массиве лайков есть пользователь с моим айди, то при отрисовке мы отрисуем этот лайк черным
    if (this._likes.some((like) => like._id === this._myId)) {
      this._likeBtn.classList.add("place__like_active");
    }
    this._setCardActionsListeners();
    return this._element;
  }

  //метод удаления лайка
  deleteMyLike(newLikes) {
    this._likeBtn.classList.remove("place__like_active");
    this._likeCounter.textContent = newLikes;
  }

  //метод добавления лайка
  addMyLike(newLikes) {
    this._likeBtn.classList.add("place__like_active");
    this._likeCounter.textContent = newLikes;
  }

  //метод удаления карточки
  removeCardFromServer() {
    this._element.remove();
    this._element = null;
  }

  //пакет слушателей кликов для каждой карточки
  _setCardActionsListeners() {
    this._likeBtn.addEventListener("click", () =>
      this._handleLikeClick(this, this.hasMyLike)
    );
    this._trashBin.addEventListener("click", () =>
      this._handleTrashBinClick(this)
    );
    this._image.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
  }
}
