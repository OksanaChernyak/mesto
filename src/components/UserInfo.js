export default class UserInfo {
  //получает объект с двумя селекторами полей - имя и описание
  constructor({ nameSelector, descriptionSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }

  //возвращает текущие текстовые значения  элементов  из разметки(читаем поля профиля со страницы)
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }

  //получает объект с ключами и устанавливает в разметку их значения(меняем поля профиля на странице)
  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._descriptionElement.textContent = data.description;
  }
}
