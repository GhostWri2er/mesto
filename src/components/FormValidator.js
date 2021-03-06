export class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._settings = settings;
    this._inputList = this._form.querySelectorAll(this._settings.inputSelector);
    this._submitButtonElement = this._form.querySelector(this._settings.submitButtonSelector);
  }

  _getErrorElement(inputElement) {
    return inputElement.closest(this._settings.popupSection).querySelector(this._settings.inputErrorClass);
  };

  _getLineElement(inputElement) {
    return inputElement.closest(this._settings.popupSection).querySelector(this._settings.inputSelector);
  }

  _showError(inputElement, errorMessage) {
    const errorElement = this._getErrorElement(inputElement);
    const lineElement = this._getLineElement(inputElement);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
    lineElement.classList.add(this._settings.inputLineRed);
  };

  _hideError(inputElement) {
    const errorElement = this._getErrorElement(inputElement);
    const lineElement = this._getLineElement(inputElement);

    errorElement.textContent = "";
    errorElement.classList.remove(this._settings.errorClass);
    lineElement.classList.remove(this._settings.inputLineRed);
  };

  _checkValidity(inputElement) {
    const isInputNotValid = !inputElement.validity.valid;
    const errorMessage = inputElement.validationMessage;
    if (isInputNotValid) {
      this._showError(inputElement, errorMessage);
    } else {
      this._hideError(inputElement);
    }
  };

  disabledSubmitButton() {
    this._submitButtonElement.classList.add(this._settings.inactiveButtonClass);
    this._submitButtonElement.setAttribute("disabled", true);
  }

  _toggleButtonState() {
    const hasInvalidInput = Array.from(this._inputList).some((inputElement) => {
      return !inputElement.validity.valid;
    });

    if (hasInvalidInput) {
      this.disabledSubmitButton();
    } else {
      this._submitButtonElement.classList.remove(this._settings.inactiveButtonClass);
      this._submitButtonElement.removeAttribute("disabled");
    }
  };

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  };

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement)
    });

  }
};
