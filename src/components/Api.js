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

    addCard(dataCard) {
      return fetch(`${this._baseUrl}cards`,
      { 
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: dataCard.name,
          link: dataCard.link
        })
      }).then(this._errorHandler)
    }

    _errorHandler(res) {
        if (res.ok) {
          return res.json()
        }

        return Promise.reject(`Ошибка: ${res.status}`)
        
      }

}