export function openModal(modalElement) {
    modalElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
}

export function closeModal(modalElement) {
    modalElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscape);
    document.body.style.overflow = '';
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









