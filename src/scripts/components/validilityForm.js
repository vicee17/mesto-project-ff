function showInputError(inputElement, errorMessage) {
    const container = inputElement.closest('.input-group');
    const errorElement = container.querySelector('.popup__error-message');

    inputElement.classList.add('popup__input-error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error-visible');
}

function hideInputError(inputElement) {
    const container = inputElement.closest('.input-group');
    const errorElement = container.querySelector('.popup__error-message');

    inputElement.classList.remove('popup__input-error');
    errorElement.classList.remove('popup__error-visible');
    errorElement.textContent = '';
}

function checkInputValidation(inputElement) {
  inputElement.setCustomValidity('');
    
    if (inputElement.validity.patternMismatch) {
        const errorMessage = inputElement.dataset.error || 'Недопустимый формат';
        inputElement.setCustomValidity(errorMessage);
    }
    
    if (inputElement.type === 'url' && !isValidUrl(inputElement.value)) {
        inputElement.setCustomValidity('Введите корректный URL');
    }

    if (!inputElement.validity.valid) {
        showInputError(inputElement, inputElement.validationMessage);
    } else {
        hideInputError(inputElement);
    }
}

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
}

function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidation(inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
}

export function enableValidation() {
    const formList = document.querySelectorAll('.popup__form');

    formList.forEach((formElement) => {
        setEventListeners(formElement);
    });

}

export function clearValidation(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');

    inputList.forEach((inputElement) => {
        hideInputError(inputElement);
        inputElement.setCustomValidity('');
    });

    toggleButtonState(inputList, buttonElement);
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('button-inactive');
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove('button-inactive')
        buttonElement.disabled = false;
    }
}
