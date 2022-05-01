export default class UserInfo {
    constructor({ userName, aboutUser }) {
        this._name = document.querySelector(userName);
        this._description = document.querySelector(aboutUser);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            description: this._description.textContent
        }
    }

    setUserInfo(title, job) {
        this._name.textContent = title;
        this._description.textContent = job;
    }
}