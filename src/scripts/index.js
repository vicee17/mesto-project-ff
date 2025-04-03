import '../blocks/main.css';
import {initialCards} from './cards';

function createCardElement(cardData, removeCard) {
    const cardTemplate = document.querySelector('#card-template').content.querySelector('.card').cloneNode(true);

    const cardImage = cardTemplate.querySelector('.card__image');
    const cardTitle = cardTemplate.querySelector('.card__title');
    const deleteButton = cardTemplate.querySelector('.card__delete-button');
    
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    deleteButton.addEventListener('click', () => {
        removeCard(cardTemplate);
    });

    return cardTemplate;
}

function removeCard(cardItem) {
    if (cardItem) {
        cardItem.remove();
    }
}

const placesList = document.querySelector('.places__list');
const cardElements = initialCards.map((cardData) => {
    return createCardElement(cardData, removeCard);
});
placesList.append(...cardElements);