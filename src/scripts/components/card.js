import { getInitialCards, createCard, deleteCard, addLike, removeLike } from "./api";
import { handleImageClick, showConfirmDeletePopup, pressConfirmButton } from "./index";

export function createCardElement(cardData, handleImageClick, userId) {
    const cardTemplate = document.querySelector('#card-template').content.querySelector('.card').cloneNode(true);

    const cardImage = cardTemplate.querySelector('.card__image');
    const cardTitle = cardTemplate.querySelector('.card__title');
    const deleteButton = cardTemplate.querySelector('.card__delete-button');
    const likeButton = cardTemplate.querySelector('.card__like-button');
    const likesCount = cardTemplate.querySelector('.likes-count');
    const confirmButton = document.querySelector('.popup__button-delete-submit');
    const cancelButton = document.querySelector('.popup__button-delete-reset');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    cardTemplate.dataset.cardId = cardData._id;
    likesCount.textContent = cardData.likes.length;

    if (cardData.owner._id !== userId) {
        deleteButton.remove();
    }

    likeButton.addEventListener('click', (evt) => handleLikeClick(evt));
    cardImage.addEventListener('click', () => handleImageClick(cardData));
    deleteButton.addEventListener('click', () => showConfirmDeletePopup(cardData._id));
    confirmButton.addEventListener('click', pressConfirmButton);

    return cardTemplate;
}

export function removeCard(cardId) {
    return deleteCard(cardId)
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
    const cardElement = evt.currentTarget.closest('.card');
    const cardId = evt.currentTarget.closest('.card').dataset.cardId;
    const likesCount = cardElement.querySelector('.likes-count');
   
    if (evt.currentTarget.classList.contains('card__like-button_is-active')) {
        removeLike(cardId)
        .then(updateCard => {
            likesCount.textContent = updateCard.likes.length;
            evt.target.classList.toggle('card__like-button_is-active');
        })
        .catch(error => console.error('Ошибка при снятии лайка:', error));
    } else {
        addLike(cardId)
        .then(updateCard => {
            likesCount.textContent = updateCard.likes.length;
            evt.target.classList.toggle('card__like-button_is-active');
        })
        .catch(error => console.error('Ошибка при добавлении лайка:', error));
    }
}

export async function loadInitialCards(placesList, userId) {
    try {
        const cards = await getInitialCards();
        const cardElements = cards.map((cardData) => {
            return createCardElement(cardData, handleImageClick, userId);
        });
        placesList.append(...cardElements);
    } catch (error) {
        console.error('Ошибка при загрузке карточек:', error);
    }
}

export async function createNewCard(cardData, placesList, userId, handleImageClick) {
    try {
        const newCard = await createCard(cardData);
        const newCardElement = createCardElement(newCard, handleImageClick, userId);
        placesList.prepend(newCardElement);
        return true;
    } catch (error) {
        console.error('Ошибка при создании карточки:', error);
        return false
    }
}

