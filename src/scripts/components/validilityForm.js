function showInputError(inputElement, errorMessage) {
    const errorElement = inputElement.nextElementSibling;

    inputElement.classList.add('popup__input-error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error-visible');
}

function hideInputError(inputElement) {
    const errorElement = inputElement.nextElementSibling;

    inputElement.classList.remove('popup__input-error');
    errorElement.classList.remove('popup__error-visible');
    errorElement.textContent = '';
}

function checkInputValidation(inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(inputElement, inputElement.validationMessage);
        return; 
    }
    if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(inputElement.value.trim())) {
        showInputError(inputElement, 'Некорректный ввод. Допустимы только латинские и русские буквы, дефисы и пробелы.');
    } else {
        hideInputError(inputElement);
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
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
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
    }else {
        buttonElement.classList.remove('button-inactive')
    }
}