

const getErrorElement = (inputElement, obj) => {
  return inputElement.closest(obj.popupSection).querySelector(obj.inputErrorClass);
};

const getLineElement = (inputElement, obj) => {
  return inputElement.closest(obj.popupSection).querySelector(obj.inputSelector);
}


const showError = (formElement, inputElement, errorMessage, obj) => {
  const errorElement = getErrorElement(inputElement, obj);
  const lineElement = getLineElement(inputElement, obj);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass);
  lineElement.classList.add(obj.inputLineRed);
};

const hideError = (formElement, inputElement, obj) => {
  const errorElement = getErrorElement(inputElement, obj);
  const lineElement = getLineElement(inputElement, obj);

  errorElement.textContent = "";
  errorElement.classList.remove(this._settings.errorClass);
  lineElement.classList.remove(this._settings.inputLineRed);
};

const toggleButtonState = (inputList, submitButtonElement) => {
  const hasInvalidInput = Array.from(inputList).some((inputElement) => {
    return !inputElement.validity.valid;
  });

  if (hasInvalidInput) {
    submitButtonElement.classList.add(this._settings.inactiveButtonClass);
    submitButtonElement.setAttribute("disabled", true);
  } else {
    submitButtonElement.classList.remove(this._settings.inactiveButtonClass);
    submitButtonElement.removeAttribute("disabled");
  }
};

const setEventListeners = (formElement) => {
  const inputList = formElement.querySelectorAll(this._settings.inputSelector);
  const submitButtonElement = formElement.querySelector(this._settings.submitButtonSelector);
  const inputListIterator = (inputElement) => {
    const handleInput = (event) => {
      checkValidity(formElement, inputElement);
      toggleButtonState(inputList, submitButtonElement);
    };

    inputElement.addEventListener("input", handleInput);
  };

  toggleButtonState(inputList, submitButtonElement);
  inputList.forEach(inputListIterator);
};

const enableValidation = (obj) => {
  const formList = document.querySelectorAll(this._settings.formSelector);
  const formListIterator = (formElement) => {
    const handleFormSubmit = (event) => {
      event.preventDefault();
    };

    formElement.addEventListener("submit", handleFormSubmit);

    setEventListeners(formElement, obj);
  };

  formList.forEach(formListIterator);
};

enableValidation(objectValidation);

const checkValidity = (formElement, inputElement, obj) => {
  const isInputNotValid = !inputElement.validity.valid;
  const errorMessage = inputElement.validationMessage;
  if (isInputNotValid) {
    showError(formElement, inputElement, errorMessage, obj);
  } else {
    hideError(formElement, inputElement, obj);
  }
};
