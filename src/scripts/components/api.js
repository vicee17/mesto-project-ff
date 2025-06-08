const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-40',
    headers: {
        authorization: 'fbeda219-9100-4651-b657-e0432b0587f1',
        'Content-Type': 'application/json',
    }
};

const getResponseData = ((res) => {
     if (res.ok) {
            return res.json();
        }
    return Promise.reject(`Ошибка: ${res.status}`);
});

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then (getResponseData);
}

export const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
    .then (getResponseData);
}

export const updateUserData = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name,
            about
        })
    })
    .then (getResponseData);
}

export const createCard = (cardData) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: cardData.name,
            link: cardData.link
        })
    })
    .then (getResponseData);
}

export const deleteCard = (cardId) => {
    return fetch (`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then (getResponseData);
}

export const addLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then (getResponseData);
}

export const removeLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then (getResponseData);
}

export const updateUserAvatar = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar
        })
    })
    .then (getResponseData);
}