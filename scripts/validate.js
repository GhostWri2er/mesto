const objectFalidation = {
  formSelector: '.popup__form-edit',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_active',
};

const getErrorElement = (inputElement) => {
  return inputElement
    .closest(".popup__block")
    .querySelector(".popup__input-error");
};

const getLineElement = (inputElement) => {
    return inputElement.closest(".popup__block")
    .querySelector(".popup__input");
}

const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = getErrorElement(inputElement);
  const lineElement = getLineElement(inputElement);


  errorElement.textContent = errorMessage;
  errorElement.classList.add(objectFalidation.errorClass);
  lineElement.classList.add("popup__input_line_red");
};

const hideError = (formElement, inputElement) => {
  const errorElement = getErrorElement(inputElement);
  const lineElement = getLineElement(inputElement);

  errorElement.textContent = "";
  errorElement.classList.remove(objectFalidation.errorClass);
  lineElement.classList.remove("popup__input_line_red");
};

const checkValidity = (formElement, inputElement) => {
  const isInputNotValid = !inputElement.validity.valid;
  console.log(inputElement.name, isInputNotValid, inputElement.validity);
  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;
    showError(formElement, inputElement, errorMessage);
  } else {
    hideError(formElement, inputElement);
  }
};

const toggleButtonState = (inputList, submitButtonElement) => {
  const hasInvalidInput = Array.from(inputList).some((inputElement) => {
    return !inputElement.validity.valid;
  });

  if (hasInvalidInput) {
    submitButtonElement
      .closest(objectFalidation.submitButtonSelector)
      .classList.add(objectFalidation.inactiveButtonClass);
    submitButtonElement.setAttribute("disabled", true);
  } else {
    submitButtonElement.classList.remove(objectFalidation.inactiveButtonClass);
    submitButtonElement.removeAttribute("disabled");
  }
};

const setEventListeners = (formElement) => {
  const inputList = formElement.querySelectorAll(objectFalidation.inputSelector);
  const submitButtonElement = formElement.querySelector(objectFalidation.submitButtonSelector);
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

const enableValidation = () => {
  const formList = document.querySelectorAll(objectFalidation.formSelector);
  const formListIterator = (formElement) => {
    const handleFormSubmit = (event) => {
      event.preventDefault();
    };

    formElement.addEventListener("submit", handleFormSubmit);

    setEventListeners(formElement);
  };

  formList.forEach(formListIterator);
};

enableValidation(objectFalidation);
