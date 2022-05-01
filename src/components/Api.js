export class Api {
    constructor(config) {
        this._baseUrl = config.baseUrl;
        this._headers = config.headers;
    }

    getProfile() {
      return fetch(`${this._baseUrl}users/me`,
      { 
        method: 'GET',
        headers: this._headers 
      }
      ).then(this._errorHandler)
      .catch(console.log)
    }

    getCards() {
      return fetch(`${this._baseUrl}cards`,
      { 
        method: 'GET',
        headers: this._headers 
      }).then(this._errorHandler)
      .catch(console.log)
    }

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

    _errorHandler(res) {
        if (res.ok) {
          return res.json()
        }

        return Promise.reject(`Ошибка: ${res.status}`)
        
      }

}