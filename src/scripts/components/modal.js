export function openModal(modalElement) {
    modalElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
}

export function closeModal(modalElement) {
    modalElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscape);
    document.body.style.overflow = '';

    const form = modalElement.querySelector('form');
    if(form) {
        form.reset();
    }
}

function handleEscape(evt) {
    if (evt.key === 'Escape') {
        const opennedModal = document.querySelector('.popup_is-opened');
        if (opennedModal) {
            closeModal(opennedModal);
        }
    }
}

export function setupModalCloseHandlers() {
    document.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup__close')) {
            closeModal(evt.target.closest('.popup'));
        }else if (evt.target.classList.contains('popup')) {
            closeModal(evt.target);
        }
    });
}

export function handlerLikes() {
    document.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('card__like-button')) {
            evt.target.classList.toggle('card__like-button_is-active');
        }
    });
}

export function handleImageClick(cardData) {
    const imagePopup = document.querySelector('.popup_type_image');
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');

    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openModal(imagePopup);
}







