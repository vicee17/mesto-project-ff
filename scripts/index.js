// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function createCardElement(cardData, removeCard) {
    const cardTemplate = document.querySelector('#card-template').content.cloneNode(true);

    const cardImage = cardTemplate.querySelector('.card__image');
    const cardTitle = cardTemplate.querySelector('.card__title');
    const deleteButton = cardTemplate.querySelector('.card__delete-button');
    
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    const cardItem = cardTemplate.children[0];

    deleteButton.addEventListener('click', () => {
        removeCard(cardItem);
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