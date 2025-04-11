export function createCardElement(cardData, removeCard, handlerLikes, handleImageClick) {
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

    cardImage.addEventListener('click', () => handleImageClick(cardData));

    return cardTemplate;
}

export function removeCard(cardItem) {
    if (cardItem) {
        cardItem.remove();
    }
}
