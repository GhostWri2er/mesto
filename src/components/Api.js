export class Api {
    constructor(config) {
        this._baseUrl = config.baseUrl;
        this._headers = config.headers;
    }
//Запросы

//Получение данных

    getProfile() {
      return fetch(`${this._baseUrl}users/me`,
      { 
        method: 'GET',
        headers: this._headers 
      }
      ).then(this._errorHandler)
      .catch(console.log)
    }

//Получение карточек

    getCards() {
      return fetch(`${this._baseUrl}cards`,
      { 
        method: 'GET',
        headers: this._headers 
      }).then(this._errorHandler)
      .catch(console.log)
    }

//Редактировать профиль

    editProfile(name, about) {
      return fetch(`${this._baseUrl}users/me`,
      { 
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name,
          about
        })
      }).then(this._errorHandler)
      .catch(console.log)
    }

//Добавить карточку.

    addCard(name, link) {
      return fetch(`${this._baseUrl}cards`,
      { 
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name,
          link
        })
      }).then(this._errorHandler)
      .catch(console.log)
    }

//Удалить карточку

    deleteCard(id) {
      return fetch(`${this._baseUrl}cards/${id}`,
      { 
        method: 'DELETE',
        headers: this._headers
      }).then(this._errorHandler)
      .catch(console.log)
    }

//Поставить лайк

    addLike(id) {
      return fetch(`${this._baseUrl}cards/${id}/likes`,
      { 
        method: 'PUT',
        headers: this._headers
      }).then(this._errorHandler)
      .catch(console.log)
    }

//Удалить лайк
  
    deleteLike(id) {
      return fetch(`${this._baseUrl}cards/${id}/likes`,
      { 
        method: 'DELETE',
        headers: this._headers
      }).then(this._errorHandler)
      .catch(console.log)
    }

//Изменить аватар

    updateAvatar(avatar) {
      return fetch(`${this._baseUrl}users/me/avatar`,
      { 
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar 
        })
      }).then(this._errorHandler)
      .catch(console.log)
    }

//Ошибки

    _errorHandler(res) {
        if (res.ok) {
          return res.json()
        }

        return Promise.reject(`Ошибка: ${res.status}`)
        
      }

      

}