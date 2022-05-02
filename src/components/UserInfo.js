export default class UserInfo {
    constructor({ userName, aboutUser, userAvatar }) {
        this._name = document.querySelector(userName);
        this._description = document.querySelector(aboutUser);
        this._userAvatar = document.querySelector(userAvatar);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            description: this._description.textContent
        }
    }

    setUserInfo(title, job, avatar) {
        this._name.textContent = title;
        this._description.textContent = job;
        this._userAvatar.src = avatar;
    }
}