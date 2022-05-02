export class Card {
  constructor(data, cardSelector, handleCardClick, handleDeleteCard, handleLikeCard) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data.id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
    this._template = document.querySelector(cardSelector).content.querySelector('.grid-cards__item');
    // this.isLiked = this.isLiked.bind(this)
    //this._handleDelete = this._handleDelete.bind(this)
  };

  isLiked() {
    const userHasLikedCard = this._likes.find(user => user._id === this._userId);
    
    return userHasLikedCard
  }

  //Метод удаления.
  deleteCard() {
    this._itemCard.remove();
    this._itemCard = null;
  }

  //Слушатели на карточку(удалить, лайк, на весь экран)
  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => this._handleDeleteCard(this._id));
    this._likeButton.addEventListener("click", () => this._handleLikeCard(this._id));
    this._imageCard.addEventListener('click', () => {
    this._handleCardClick(this._name, this._link)
    });
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    const likeCountElement = this._itemCard.querySelector('.card__like_score')
    likeCountElement.textContent = this._likes.length;

    if(this.isLiked()) {
      this._putLike()
    } else {
      this._deleteLike()
    }
  }

  //Метод лайка.

  _putLike = () => {
    this._likeButton.classList.add("card__like_active");
  };

  _deleteLike = () => {
    this._likeButton.classList.remove("card__like_active");
  };
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


    this._setEventListeners();

    

    if(this._ownerId !== this._userId) {
      this._deleteButton.style.display = 'none';
    }
    this.setLikes(this._likes);

    //Вернули
    return this._itemCard;

  };

};



