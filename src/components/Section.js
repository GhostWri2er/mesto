export default class Section {
  constructor({ items, renderer }, containerContainer) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerContainer);
  };

  renderItems() {
    this._items.forEach(data => {
      this._renderer(data);
    })
  };

  addItems(element) {
    this._container.append(element);
  };
}
