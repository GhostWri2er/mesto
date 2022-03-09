const objectValidation = {
  formSelector: '.popup__form-edit',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_active',
};

const getErrorElement = (inputElement) => {
  return inputElement.closest(".popup__block").querySelector('.popup__input-error');
};

const showError = (formElement, inputElement, errorMessage, obj) => {
  const errorElement = getErrorElement(inputElement, objectValidation);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass);
};

const hideError = (formElement, inputElement, obj) => {
  const errorElement = getErrorElement(inputElement, objectValidation);

  errorElement.textContent = "";
  errorElement.classList.remove(obj.errorClass);
};

const checkValidity = (formElement, inputElement) => {
  const isInputNotValid = !inputElement.validity.valid;
  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;
    showError(formElement, inputElement, errorMessage, objectValidation);
  } else {
    hideError(formElement, inputElement, objectValidation);
  }
};

const toggleButtonState = (inputList, submitButtonElement) => {
  const hasInvalidInput = Array.from(inputList).some((inputElement) => {
    return !inputElement.validity.valid;
  });

  if (hasInvalidInput) {
    submitButtonElement.classList.add(objectValidation.inactiveButtonClass);
    submitButtonElement.setAttribute("disabled", true);
  } else {
    submitButtonElement.classList.remove(objectValidation.inactiveButtonClass);
    submitButtonElement.removeAttribute("disabled");
  }
};

const setEventListeners = (formElement, obj) => {
  const inputList = formElement.querySelectorAll(obj.inputSelector);
  const submitButtonElement = formElement.querySelector(obj.submitButtonSelector);
  const inputListIterator = (inputElement) => {
    const handleInput = (event) => {
      checkValidity(formElement, inputElement);
      toggleButtonState(inputList, submitButtonElement, objectValidation);
    };

    inputElement.addEventListener("input", handleInput);
  };

  toggleButtonState(inputList, submitButtonElement);
  inputList.forEach(inputListIterator);
};

const enableValidation = (obj) => {
  const formList = document.querySelectorAll(obj.formSelector);
  const formListIterator = (formElement) => {
    const handleFormSubmit = (event) => {
      event.preventDefault();
    };

    formElement.addEventListener("submit", handleFormSubmit);

    setEventListeners(formElement, objectValidation);
  };

  formList.forEach(formListIterator);
};

enableValidation(objectValidation);
