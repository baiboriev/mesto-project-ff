// c6e953a7-183c-4f9c-99c4-d2ffb71e11a8
// wff-cohort-30

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-30",
  headers: {
    authorization: "c6e953a7-183c-4f9c-99c4-d2ffb71e11a8",
    "Content-Type": "application/json",
  },
};

export const getInitialCards = () => {
  return fetch(config.baseUrl + "/cards", {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      return console.log(err);
    });
};

export const getUserData = () => {
  return fetch(config.baseUrl + "/users/me", {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      return console.log(err);
    });
};

export const editUserData = (userData) => {
  return fetch(config.baseUrl + "/users/me", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userData.name,
      about: userData.about,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      return console.log(err);
    });
};

export const addNewCard = (newCard) => {
  return fetch(config.baseUrl + "/cards", {
    method: "POST",
    body: JSON.stringify({
      name: newCard.name,
      link: newCard.link,
    }),
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      return console.log(err);
    });
};

export const deleteCardFromServer = (cardId) => {
  fetch(config.baseUrl + `/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
};

export const putLike = (cardId) => {
  return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      return console.log(err);
    });
};

export const deleleLike = (cardId) => {
  return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      return console.log(err);
    });
};

export const changeAvatar = (avatarUrl) => {
  return fetch(config.baseUrl + "/users/me/avatar", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      return console.log(err);
    });
};
