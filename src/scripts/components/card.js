import { deleteCard, addLike, removeLike } from "./api";

export function createCardElement(cardData, handleImageClick, userId, showConfirmDeletePopup) {
    const cardTemplate = document.querySelector('#card-template').content.querySelector('.card').cloneNode(true);
    const cardId = cardData._id;
    
    cardTemplate.id = cardId;

    const cardImage = cardTemplate.querySelector('.card__image');
    const cardTitle = cardTemplate.querySelector('.card__title');
    const deleteButton = cardTemplate.querySelector('.card__delete-button');
    const likeButton = cardTemplate.querySelector('.card__like-button');
    const likesCount = cardTemplate.querySelector('.likes-count');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    likesCount.textContent = cardData.likes.length;

    const isLiked = cardData.likes.some(like => like._id === userId);
    if (isLiked) {
        likeButton.classList.add('card__like-button_is-active');
    }

    if (cardData.owner._id !== userId) {
        deleteButton.remove();
    }

    likeButton.addEventListener('click', (evt) => handleLikeClick(evt));
    cardImage.addEventListener('click', () => handleImageClick(cardData));
    deleteButton.addEventListener('click', () => showConfirmDeletePopup(cardId));

    return cardTemplate;
}

export function removeCard(cardId) {
    return deleteCard(cardId)
    .then (() => {
        const cardElement = document.getElementById(cardId);
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
    const cardId = cardElement.id;
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



