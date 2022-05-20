//отрисует любой однотипный элемент на странице
export default class Section {
  //принимает объект с массивом данных для карточек и функцией, их создающей
  //вторым аргументом принимает селектор контейнера, в который будем вставлять карточки
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    //this._items = items;
    this._containerElement = document.querySelector(containerSelector);
  }

  //для каждого айтема применяет рендерер
  renderSectionItems(items) {
    items.forEach((item) => {
      const card = this._renderer(item);
      this.setItem(card);
    });
  }

  //вставит в разметку
  setItem(element) {
    this._containerElement.prepend(element);
  }
}
