import { getInitialCards, createCard, deleteCard, addLike, removeLike } from "./api";
import { handleImageClick } from "./index";

export function createCardElement(cardData, removeCard, handleImageClick) {
    const cardTemplate = document.querySelector('#card-template').content.querySelector('.card').cloneNode(true);

    const cardImage = cardTemplate.querySelector('.card__image');
    const cardTitle = cardTemplate.querySelector('.card__title');
    const deleteButton = cardTemplate.querySelector('.card__delete-button');
    const likeButton = cardTemplate.querySelector('.card__like-button');

    
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    cardTemplate.dataset.cardId = cardData._id;

    deleteButton.addEventListener('click', () => removeCard(cardTemplate));
    likeButton.addEventListener('click', (evt) => handleLikeClick(evt));
    cardImage.addEventListener('click', () => handleImageClick(cardData));

    return cardTemplate;
}

export function removeCard(cardId) {
    deleteCard(cardId)
    .then (() => {
        const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
        if (cardElement) {
            cardElement.remove();
        }
    }) 
    .catch(error => {
        console.error('Ошибка при удалении карточки:', error);
    });
}

function handleLikeClick(evt) {
    const cardId = evt.currentTarget.closest('.card').dataset.cardId;
   
    if (evt.currentTarget.classList.contains('card__like-button_is-active')) {
        removeLike(cardId);
    } else {
        addLike(cardId);
    }
}

export async function loadInitialCards(placesList) {
    try {
        const cards = await getInitialCards();
        const cardElements = cards.map((cardData) => {
            return createCardElement(cardData, removeCard, handleImageClick);
        });
        placesList.append(...cardElements);
    } catch (error) {
        console.error('Ошибка при загрузке карточек:', error);
    }
}

export async function createNewCard(cardData, placesList) {
    try {
        const newCard = await createCard(cardData);
        const newCardElement = createCardElement(newCard, removeCard, handleImageClick);
        placesList.prepend(newCardElement);
    } catch (error) {
        console.error('Ошибка при создании карточки:', error);
    }
}