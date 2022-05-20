export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _handleError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      `Произошла ошибка ${res.status}, что-то поломалось. Сочувствуем:(`
    );
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}${"cards"}`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handleError);
  }

  addCardtoServer(data) {
    return fetch(`${this._baseUrl}${"cards"}`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._handleError);
  }

  getUserData() {
    return fetch(`${this._baseUrl}${"users/me"}`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handleError);
  }

  changeUserData({ name, about }) {
    return fetch(`${this._baseUrl}${"users/me"}`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._handleError);
  }

  changeAvatar({ avatar }) {
    return fetch(`${this._baseUrl}${"users/me/avatar"}`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._handleError);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}${"cards/"}${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleError);
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}${"cards/likes/"}${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._handleError);
  }

  deleteLikeFromCard(cardId) {
    return fetch(`${this._baseUrl}${"cards/likes/"}${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleError);
  }
}
