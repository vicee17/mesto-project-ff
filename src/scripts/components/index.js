import '../../blocks/main.css';  
import {initialCards} from './cards';
import { openModal, closeModal, setupModalCloseHandlers } from './modal';
import { createCardElement, removeCard } from './card';

const placesList = document.querySelector('.places__list');
const cardElements = initialCards.map((cardData) => {
    return createCardElement(cardData, removeCard);
});
placesList.append(...cardElements);

document.addEventListener('DOMContentLoaded', () => {
    setupModalCloseHandlers();
  });

const profileEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const editForm = document.forms['edit-profile'];
const addCardFrom = document.forms['new-place'];

profileEditButton.addEventListener('click',() => openModal(popupEdit));
addCardButton.addEventListener('click', () => openModal(addCardPopup));


