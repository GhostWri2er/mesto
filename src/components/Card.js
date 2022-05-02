export class Card {
  constructor(data, cardSelector, handleCardClick, handleDeleteCard) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data.id;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._template = document.querySelector(cardSelector).content.querySelector('.grid-cards__item');

    //this._handleDelete = this._handleDelete.bind(this)
  };

  //Метод лайка.
  _handelLike = () => {
    this._likeButton.classList.toggle("card__like_active");
  };

  //Метод удаления.
  deleteCard() {
    this._itemCard.remove();
    this._itemCard = null;
  }



  //Слушатели на карточку(удалить, лайк, на весь экран)
  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => this._handleDeleteCard(this._id));
    this._likeButton.addEventListener("click", this._handelLike);
    this._imageCard.addEventListener('click', () => {
    this._handleCardClick(this._name, this._link)
    });
  }

  _setLikes() {
    const likeCountElement = this._template.querySelector('.card__like_score')
    likeCountElement.textContent = this._likes.length;
  }

  //Создание и получение карточки.
  getCardElement () {
    //Нашли
    this._itemCard = this._template.cloneNode(true);
    this._imageCard = this._itemCard.querySelector(".card__image");
    this._deleteButton = this._itemCard.querySelector(".card__button-delete");
    this._likeButton = this._itemCard.querySelector(".card__like");

    //Заполнили
    this._itemCard.querySelector(".card__name").textContent = this._name;
    this._imageCard.src = this._link;
    this._imageCard.alt = this._name;

    this._setLikes();

    this._setEventListeners();

    //Вернули
    return this._itemCard;

  };

};



