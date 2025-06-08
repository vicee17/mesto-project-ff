import '../../pages/index.css';  
import { openModal, closeModal, setupModalCloseHandlers } from './modal';
import { removeCard, createCardElement } from './card';
import { enableValidation, clearValidation } from './validilityForm';
import { getUserData, updateUserData, updateUserAvatar, getInitialCards, createCard } from './api';

const placesList = document.querySelector('.places__list');
let userId = '';
let cardIdForDelete = null;

document.addEventListener('DOMContentLoaded', () => {
    setupModalCloseHandlers();
    enableValidation();
    document.querySelectorAll('.popup').forEach(popup => {
        popup.classList.add('popup_is-animated');
    });

    Promise.all([
        getUserData(),
        getInitialCards()
    ])
    .then(([userData, cards]) => {
        userId = userData._id;
        
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        document.querySelector('.profile__image').style.backgroundImage = `url('${userData.avatar}')`;
        
        renderCards(cards, placesList, userId);
    })
    .catch(error => {
        console.error('Ошибка загрузки данных:', error);
    });
});

function renderCards(cards, container, userId) {
    if (!Array.isArray(cards)) {
        console.error('Ожидался массив карточек');
        return;
    }
    
    const cardElements = cards.map(cardData => 
        createCardElement(cardData, handleImageClick, userId, showConfirmDeletePopup)
    );
    
    container.append(...cardElements);
}

async function createNewCard(cardData, placesList, userId, handleImageClick) {
    try {
        const newCard = await createCard(cardData);
        const newCardElement = createCardElement(newCard, handleImageClick, userId, showConfirmDeletePopup);
        placesList.prepend(newCardElement);
        return true;
    } catch (error) {
        console.error('Ошибка при создании карточки:', error);
        return false
    }
}

//Popups
const popupEdit = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const newAvatarPopup = document.querySelector('.popup_type_edit-profile');
const confirmDeletePopup = document.querySelector('.popup_type_delete-card');

//DOM Elements
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

//Buttons
const addCardButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const newAvatarButton = document.querySelector('.profile__image');
const confirmButton = document.querySelector('.popup__button-delete-submit');

//Forms
const editForm = document.forms['edit-profile'];
const addCardFrom = document.forms['new-place'];
const newAvatarForm = document.forms['new-avatar'];

//Inputs profile
const nameInput = editForm.querySelector('.popup__input_type_name');
const descriptionInput = editForm.querySelector('.popup__input_type_description');

//Inputs cards
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_url');

profileEditButton.addEventListener('click',() => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;

  clearValidation(editForm);
  openModal(popupEdit);
});

confirmButton.addEventListener('click', pressConfirmButton);

function showConfirmDeletePopup(cardId) {
  cardIdForDelete = cardId;
  openModal(confirmDeletePopup);
}

function pressConfirmButton() {
  if (cardIdForDelete) {
    removeCard(cardIdForDelete)
      .then(() => closeModal(confirmDeletePopup))
      .catch(error => console.error('Ошибка удаления:', error));
  }
}

async function updateUser(userData) {
    try {
        await updateUserData(userData.name, userData.about);
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        closeModal(popupEdit);
    } catch (error) {
        console.error('Ошибка при обновлении данных пользователя:', error);
    }
}

editForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  
  const submitButton = evt.submitter;

  handleLoadingButton(submitButton, true);

  updateUser({ name: nameInput.value, about: descriptionInput.value })
  .then(() => {
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeModal(popupEdit); 
  })
  .catch((err) => {
    console.error('Ошибка обновления:', err); 
  })
  .finally(() => {
    handleLoadingButton(submitButton, false);
  });
});

newAvatarForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const submitButton = evt.submitter;
    handleLoadingButton(submitButton, true);

    const avatarUrl = newAvatarForm.querySelector('.popup__input_type_new-avatar').value;
    
    updateUserAvatar(avatarUrl)
        .then(() => {
            document.querySelector('.profile__image').style.backgroundImage = `url('${avatarUrl}')`;
            closeModal(newAvatarPopup);
            newAvatarForm.reset();
        })
        .catch(error => console.error('Ошибка обновления аватара:', error))
        .finally(() => {
          handleLoadingButton(submitButton, false);
        });
});

newAvatarButton.addEventListener('click', () => {
  openModal(newAvatarPopup);
});

function handleImageClick(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(imagePopup);
}

addCardButton.addEventListener('click', () => {
  addCardFrom.reset();
  clearValidation(addCardFrom);
  openModal(addCardPopup);
});

addCardFrom.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const submitButton = evt.submitter;

  handleLoadingButton(submitButton, true, 'Создание...', 'Создать');

  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };

  createNewCard(newCardData, placesList, userId, handleImageClick)
  .then((isSuccess) => {
    if(isSuccess) {
      closeModal(addCardPopup);
      addCardFrom.reset();
    }
  }) 
  .catch(error => console.error('Ошибка при создании карточки:', error))
  .finally(() => {
     handleLoadingButton(submitButton, false, 'Создание...', 'Создать');
  })
});

function handleLoadingButton(button, isLoading, loadingText = 'Сохранение...', defaultText = 'Сохранить') {
  button.disabled = isLoading;
  button.textContent = isLoading ? loadingText : defaultText;
}












