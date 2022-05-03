export default class Section {
  constructor({ items, renderer }, containerContainer) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerContainer);
  };

  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    })
  };

  addItems(element) {
    this._container.prepend(element);
  };
}
