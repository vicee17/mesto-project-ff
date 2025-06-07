import '../../pages/index.css';  
import { openModal, closeModal, setupModalCloseHandlers } from './modal';
import { removeCard, loadInitialCards, createNewCard } from './card';
import { enableValidation, clearValidation } from './validilityForm';
import { getUserData, updateUserData, updateUserAvatar } from './api';

const placesList = document.querySelector('.places__list');
let userId = '';
let cardIdForDelete = null;

document.addEventListener('DOMContentLoaded', () => {
    setupModalCloseHandlers();
    enableValidation();
    document.querySelectorAll('.popup').forEach(popup => {
      popup.classList.add('popup_is-animated');
    });
    getUserData()
      .then(userData => {
        userId = userData._id;
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        const profileImage = document.querySelector('.profile__image');
        profileImage.style.backgroundImage = `url('${userData.avatar}')`;
        loadInitialCards(placesList, userId);
      })
      .catch(error => console.error(`Ошибка загрузки данных пользователя:`, error));
  });

//Popups
const popupEdit = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const newAvatarPopup = document.querySelector('.popup_type_edit-profile');
const confirmDeletePopup = document.querySelector('.popup_type_delete-card');

//DOM Elements
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

//Buttons
const addCardButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const newAvatarButton = document.querySelector('.profile__image');

//Forms
const editForm = document.forms['edit-profile'];
const addCardFrom = document.forms['new-place'];
const newAvatarForm = document.forms['new-avatar'];

//Inputs profile
const nameInput = editForm.querySelector('.popup__input_type_name');
const descriptionInput = editForm.querySelector('.popup__input_type_description');

//Inputs cards
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_url');

profileEditButton.addEventListener('click',() => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;

  clearValidation(editForm);
  openModal(popupEdit);
});

export function showConfirmDeletePopup(cardId) {
  cardIdForDelete = cardId;
  openModal(confirmDeletePopup);
}

export function pressConfirmButton() {
  if (cardIdForDelete) {
    removeCard(cardIdForDelete)
      .then(() => closeModal(confirmDeletePopup))
      .catch(error => console.error('Ошибка удаления:', error));
  }
}

async function updateUser(userData) {
    try {
        await updateUserData(userData.name, userData.about);
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        closeModal(popupEdit);
    } catch (error) {
        console.error('Ошибка при обновлении данных пользователя:', error);
    }
}

editForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  
  const submitButton = editForm.querySelector('.popup__button');
  const saveButtonOriginalText = submitButton.textContent;

  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;

  updateUser({ name: nameInput.value, about: descriptionInput.value })
  .then(() => {
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeModal(popupEdit); 
  })
  .catch((err) => {
    console.error('Ошибка обновления:', err); 
  })
  .finally(() => {
    submitButton.textContent = saveButtonOriginalText;
    submitButton.disabled = false;
  });
});

newAvatarForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const submitButton = newAvatarForm.querySelector('.popup__button');
    const originalText = submitButton.textContent;

    submitButton.textContent = 'Сохранение...';
    submitButton.disabled = true;

    const avatarUrl = newAvatarForm.querySelector('.popup__input_type_new-avatar').value;
    
    updateUserAvatar(avatarUrl)
        .then(() => {
            document.querySelector('.profile__image').style.backgroundImage = `url('${avatarUrl}')`;
            closeModal(newAvatarPopup);
            newAvatarForm.reset();
        })
        .catch(error => console.error('Ошибка обновления аватара:', error))
        .finally(() => {
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        });
});

newAvatarButton.addEventListener('click', () => {
  openModal(newAvatarPopup);
});

export function handleImageClick(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(imagePopup);
}

addCardButton.addEventListener('click', () => {
  addCardFrom.reset();
  clearValidation(addCardFrom);
  openModal(addCardPopup);
});

addCardFrom.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const submitButton = addCardFrom.querySelector('.popup__button');
  const saveButtonOriginalText = submitButton.textContent;

  submitButton.textContent = 'Создание...';
  submitButton.disabled = true;

  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };

  const isSuccess = createNewCard(newCardData, placesList, userId, handleImageClick);

  if (isSuccess) {
    closeModal(addCardPopup);
    addCardFrom.reset();
  } else {
    console.error('Не удалось создать карточку');
  }

  submitButton.textContent = saveButtonOriginalText;
  submitButton.disabled = false;
});












