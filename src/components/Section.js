export default class Section {
  constructor({ items, renderer }, cardsContainer, api) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = cardsContainer;
    this._api = api;
  };

  renderCards(cards) {
    cards.forEach(item => {
      this._renderer(item);
    })
  };

  addItems(card) {
    this._container.prepend(card);
  };
}
