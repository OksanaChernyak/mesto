export default class UserInfo {
  //получает объект с двумя селекторами полей - имя и описание
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  //возвращает текущие текстовые значения  элементов  из разметки(читаем поля профиля со страницы)
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
    };
  }

  //получает объект с ключами и устанавливает в разметку их значения(меняем поля профиля на странице)
  setUserInfo(data) {
    //объект получит еще идентификатор пользователя
    this._myId = data._id;
    this._nameElement.textContent = data.name;
    this._aboutElement.textContent = data.about;
    this._avatarElement.src = data.avatar;
  }

  //вернем мой айди
  returnMyId() {
    return this._myId;
  }
}
