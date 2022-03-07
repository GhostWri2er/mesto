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
  errorElement.classList.add("popup__input-error_active");
  lineElement.classList.add("popup__input_line_red");
};

const hideError = (formElement, inputElement) => {
  const errorElement = getErrorElement(inputElement);
  const lineElement = getLineElement(inputElement);

  errorElement.textContent = "";
  errorElement.classList.remove("popup__input-error_active");
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
      .closest(".popup__button-save")
      .classList.add("popup__button-save_inactive");
    submitButtonElement.setAttribute("disabled", true);
  } else {
    submitButtonElement.classList.remove("popup__button-save_inactive");
    submitButtonElement.removeAttribute("disabled");
  }
};

const setEventListeners = (formElement) => {
  const inputList = formElement.querySelectorAll(".popup__input");
  const submitButtonElement = formElement.querySelector(".popup__button-save");
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
  const formList = document.querySelectorAll(".popup__form-edit");
  const formListIterator = (formElement) => {
    const handleFormSubmit = (event) => {
      event.preventDefault();
    };

    formElement.addEventListener("submit", handleFormSubmit);

    setEventListeners(formElement);
  };

  formList.forEach(formListIterator);
};

enableValidation();
