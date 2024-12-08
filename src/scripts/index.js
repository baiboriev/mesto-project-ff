import "../pages/index.css";
import { initialCards } from "./cards";
import { createCard, likeCard, removeCard } from "./card";
import { openModal, closeModal } from "./modal";

const cardContainer = document.querySelector(".places__list");

const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

const imagePopupImg = document.querySelector(".popup__image");
const imagePopupImgName = document.querySelector(".popup__caption");

const profilePopupName = document.querySelector(".profile__title");
const profilePopupJob = document.querySelector(".profile__description");

const profileEditBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__add-button");

const formElementEdit = document.forms["edit-profile"];
const nameInput = formElementEdit["name"];
const jobInput = formElementEdit["description"];

const formElementNewAdd = document.forms["new-place"];
const placeNameInput = formElementNewAdd["place-name"];
const imageLinkInput = formElementNewAdd["link"];

const popups = document.querySelectorAll(".popup");

// Добавление анимации каждому попап окну, добавление обработчика закрытия
popups.forEach((evt) => {
  evt.classList.add("popup_is-animated");

  evt.addEventListener("click", (e) => {
    if (e.target === evt) closeModal(evt);
  });
  const closeBtn = evt.querySelector(".popup__close");
  closeBtn.addEventListener("click", () => closeModal(evt));
});

// Добавление карточек из cards.js
initialCards.forEach((element) => {
  const cardElement = createCard(
    element.name,
    element.link,
    likeCard,
    openImage,
    removeCard
  );
  cardContainer.append(cardElement);
});

// Обработчик событий: кнопка редактирования профиля
profileEditBtn.addEventListener("click", (evt) => {
  openModal(profilePopup);

  nameInput.value = profilePopupName.textContent;
  jobInput.value = profilePopupJob.textContent;
});

// Обработчик событий: кнопка добавления новой карточки
addBtn.addEventListener("click", (evt) => {
  openModal(cardPopup);
});

// Функция редактирования профиля
function handleFormEditSubmit(evt) {
  evt.preventDefault();

  profilePopupName.textContent = nameInput.value;
  profilePopupJob.textContent = jobInput.value;

  closeModal(profilePopup);
}

// Функция добавления новой карточки в DOM
function handleFormAddSubmit(evt) {
  evt.preventDefault();

  const newCard = createCard(
    placeNameInput.value,
    imageLinkInput.value,
    likeCard,
    openImage,
    removeCard
  );

  cardContainer.prepend(newCard);

  placeNameInput.value = "";
  imageLinkInput.value = "";

  closeModal(cardPopup);
}

// Функция открытия попапа изображения
function openImage(cardName, imageLink) {
  imagePopupImg.src = imageLink;
  imagePopupImg.alt = cardName;
  imagePopupImgName.textContent = cardName;

  openModal(imagePopup);
}

formElementEdit.addEventListener("submit", handleFormEditSubmit);
formElementNewAdd.addEventListener("submit", handleFormAddSubmit);
