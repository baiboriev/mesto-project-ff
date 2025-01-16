import "../pages/index.css";
import { createCard } from "./card";
import { openModal, closeModal } from "./modal";
import { enableValidation, clearValidation } from "./validation";
import {
  getInitialCards,
  getUserData,
  editUserData,
  addNewCard,
  deleteCardFromServer,
  putLike,
  deleleLike,
  changeAvatar,
} from "./api";

const cardContainer = document.querySelector(".places__list");

const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const deleteCardPopup = document.querySelector(".popup_type_delete-card");
const editAvatarPopup = document.querySelector(".popup_type_edit-avatar");

const imagePopupImg = document.querySelector(".popup__image");
const imagePopupImgName = document.querySelector(".popup__caption");

const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__title");
const profileDescription = profile.querySelector(".profile__description");
const profileAvatar = profile.querySelector(".profile__image");
const profileAvatarWrapper = profile.querySelector(".profile__image-wrapper");

const profileEditBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__add-button");

const formElementEdit = document.forms["edit-profile"];
const nameInput = formElementEdit["name"];
const aboutInput = formElementEdit["description"];

const formElementNewAdd = document.forms["new-place"];
const placeNameInput = formElementNewAdd["place-name"];
const imageLinkInput = formElementNewAdd["link"];

const formElementDelete = document.forms["delete"];

const formElementEditAvatar = document.forms["edit-avatar"];
const avatarInput = formElementEditAvatar["link"];

const popups = document.querySelectorAll(".popup");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Добавление анимации каждому попап окну, добавление обработчика закрытия
popups.forEach((evt) => {
  evt.classList.add("popup_is-animated");

  evt.addEventListener("click", (e) => {
    if (e.target === evt) closeModal(evt);
  });
  const closeBtn = evt.querySelector(".popup__close");
  closeBtn.addEventListener("click", () => closeModal(evt));
});

// Загрузка информации о пользователе с сервера
// Загрузка карточек с сервера

Promise.all([getUserData(), getInitialCards()])
  .then(([userData, initialCards]) => {
    profile.dataset.id = userData._id;
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.src = userData.avatar;

    initialCards.forEach((cardData) => {
      const cardElement = createCard(
        {
          cardName: cardData.name,
          cardImageLink: cardData.link,
          cardId: cardData._id,
          cardLikes: cardData.likes,
          ownerId: cardData.owner._id,
          currentUserId: userData._id,
        },
        likeCard,
        openImage,
        removeCard
      );
      cardContainer.append(cardElement);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Обработчик событий: кнопка редактирования профиля
profileEditBtn.addEventListener("click", (evt) => {
  clearValidation(profilePopup, validationConfig);
  
  openModal(profilePopup);

  nameInput.value = profileName.textContent;
  aboutInput.value = profileDescription.textContent;
});

// Обработчик событий: кнопка добавления новой карточки
addBtn.addEventListener("click", (evt) => {
  clearValidation(cardPopup, validationConfig);
  
  openModal(cardPopup);

  placeNameInput.value = "";
  imageLinkInput.value = "";
});

// Обработчик событий: кнопка изменения аватара
profileAvatarWrapper.addEventListener("click", (evt) => {
  clearValidation(editAvatarPopup, validationConfig);
  
  openModal(editAvatarPopup);

  avatarInput.value = profileAvatar.src;
});

// Функция редактирования профиля
function handleFormEditSubmit(evt) {
  evt.preventDefault();

  renderLoading(true, formElementEdit.querySelector(".button"));

  profileName.textContent = nameInput.value;
  profileDescription.textContent = aboutInput.value;

  editUserData({ name: nameInput.value, about: aboutInput.value }).finally(() =>
    renderLoading(false, formElementEdit.querySelector(".button"))
  );

  closeModal(profilePopup);
}

//Функция смены аватара пользователя
function handleFormEditAvatarSubmit(evt) {
  evt.preventDefault();

  renderLoading(true, formElementEditAvatar.querySelector(".button"));

  changeAvatar(avatarInput.value).finally(() =>
    renderLoading(false, formElementEditAvatar.querySelector(".button"))
  );

  profileAvatar.src = avatarInput.value;

  closeModal(editAvatarPopup);
}

// Функция добавления новой карточки
function handleFormAddSubmit(evt) {
  evt.preventDefault();

  renderLoading(true, formElementNewAdd.querySelector(".button"));

  addNewCard({ name: placeNameInput.value, link: imageLinkInput.value })
    .then((cardData) => {
      const cardElement = createCard(
        {
          cardName: cardData.name,
          cardImageLink: cardData.link,
          cardId: cardData._id,
          cardLikes: cardData.likes,
          ownerId: cardData.owner._id,
          currentUserId: profile.dataset.id,
        },
        likeCard,
        openImage,
        removeCard
      );
      cardContainer.prepend(cardElement);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() =>
      renderLoading(false, formElementNewAdd.querySelector(".button"))
    );

  placeNameInput.value = "";
  imageLinkInput.value = "";

  clearValidation(cardPopup, validationConfig);

  closeModal(cardPopup);
}

// Функция удаления карточки
function handleFormDeleteSubmit(evt) {
  evt.preventDefault();

  const cardId = evt.target.dataset.id;
  const cardElement = document.querySelector(`.card[data-id="${cardId}"`);

  deleteCardFromServer(cardId);
  
  cardElement.remove();

  evt.target.removeEventListener("click", handleFormDeleteSubmit);

  closeModal(deleteCardPopup);
}

// Функция открытия попапа изображения
function openImage(cardName, imageLink) {
  imagePopupImg.src = imageLink;
  imagePopupImg.alt = cardName;
  imagePopupImgName.textContent = cardName;

  openModal(imagePopup);
}

// Функция открытия попапа удаления карточки
function removeCard(cardId) {
  openModal(deleteCardPopup);

  formElementDelete.dataset.id = cardId;
  formElementDelete.addEventListener("submit", handleFormDeleteSubmit);
}

// Функция лайка карточки
function likeCard(cardLikeBtn, cardId, cardLikeCount) {
  cardLikeBtn.classList.toggle("card__like_button_is-active");
  if (cardLikeBtn.classList.contains("card__like_button_is-active")) {
    putLike(cardId).then((data) => {
      cardLikeCount.textContent = data.likes.length;
    });
  } else {
    deleleLike(cardId).then((data) => {
      cardLikeCount.textContent = data.likes.length;
    });
  }
}

// Функция уведолмения процесса загрузки
function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = button.dataset.loading;
  } else {
    button.textContent = button.dataset.default;
  }
}

formElementEdit.addEventListener("submit", handleFormEditSubmit);
formElementNewAdd.addEventListener("submit", handleFormAddSubmit);
formElementEditAvatar.addEventListener("submit", handleFormEditAvatarSubmit);

enableValidation(validationConfig);
