import '../../pages/index.css';  
import { initialCards } from './cards';
import { openModal, closeModal, setupModalCloseHandlers } from './modal';
import { createCardElement, removeCard, loadInitialCards, createNewCard } from './card';
import { enableValidation, clearValidation } from './validilityForm';
import { getUserData, updateUserDatam, updateUserAvatar } from './api';

const placesList = document.querySelector('.places__list');

document.addEventListener('DOMContentLoaded', () => {
    setupModalCloseHandlers();
    enableValidation();
    document.querySelectorAll('.popup').forEach(popup => {
      popup.classList.add('popup_is-animated');
    });
    loadInitialCards(placesList);
  });

//Popups
const popupEdit = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const newAvatarPopup = document.querySelector('.popup_type_edit-profile');

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
const nameInput = editForm.querySelector('.popup__input_type_name')
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

editForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(popupEdit);
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

  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };

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

  const newCardElement = createCardElement(newCardData, removeCard, handleImageClick);

  placesList.prepend(newCardElement);

  closeModal(addCardPopup);
  addCardFrom.reset();
});












