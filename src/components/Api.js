export class Api {
    constructor(config) {
        this._baseUrl = config.baseUrl;
        this._headers = config.headers;
    }

    getUserInfo() {
      return fetch(`${this._baseUrl}users/me`,
      { 
        method: 'GET',
        headers: this._headers 
      }).then(this._errorHandler)
    }

    getInitialCards() {
      return fetch(`${this._baseUrl}cards`,
      { 
        method: 'GET',
        headers: this._headers 
      }).then(this._errorHandler)
    }

    setUserInfoServer({ user }) {
      return fetch(`${this._baseUrl}users/me`,
      { 
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: user.name,
          about: user.description
        })
      }).then(this._errorHandler)
    }

    addCard(data) {
      return fetch(`${this._baseUrl}cards`,
      { 
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(data)
      }).then(this._errorHandler)
    }

    _errorHandler(res) {
        if (res.ok) {
          return res.json()
        }

        return Promise.reject(`Ошибка: ${res.status}`)
        
      }

}