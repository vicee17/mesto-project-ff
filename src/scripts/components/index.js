import '../../pages/index.css';  
import {initialCards} from './cards';
import { openModal, closeModal, setupModalCloseHandlers} from './modal';
import { createCardElement, removeCard} from './card';

const placesList = document.querySelector('.places__list');
const cardElements = initialCards.map((cardData) => {
    return createCardElement(cardData, removeCard, handleImageClick);
});
placesList.append(...cardElements);

document.addEventListener('DOMContentLoaded', () => {
    setupModalCloseHandlers();
    document.querySelectorAll('.popup').forEach(popup => {
      popup.classList.add('popup_is-animated');
    });
  });

//Popups
const popupEdit = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');

//DOM Elements
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

//Buttons
const addCardButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');

//Forms
const editForm = document.forms['edit-profile'];
const addCardFrom = document.forms['new-place'];

//Inputs profile
const nameInput = editForm.querySelector('.popup__input_type_name')
const descriptionInput = editForm.querySelector('.popup__input_type_description');

//Inputs cards
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_url');

profileEditButton.addEventListener('click',() => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;

  openModal(popupEdit);
});

editForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(popupEdit);
});

export function handleImageClick(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(imagePopup);
}

addCardButton.addEventListener('click', () => {openModal(addCardPopup)});

addCardFrom.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };

  const newCardElement = createCardElement(newCardData, removeCard, handleImageClick);

  placesList.prepend(newCardElement);

  closeModal(addCardPopup);
  addCardFrom.reset();
});










