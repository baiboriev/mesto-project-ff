import "../pages/index.css";
import { initialCards } from "./cards";
import { createCard } from "./card";
import { openModal, closeModal } from "./modal";

const cardContainer = document.querySelector(".places__list");

const profileEditBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__add-button");

const formElementEdit = document.forms["edit-profile"];
const nameInput = formElementEdit["name"];
const jobInput = formElementEdit["description"];

const formElementNewPlace = document.forms["new-place"];
const placeNameInput = formElementNewPlace["place-name"];
const imageLinkInput = formElementNewPlace["link"];

const popups = document.querySelectorAll(".popup");

// Добавление анимации каждому попап окну
popups.forEach((evt) => {
  evt.classList.add("popup_is-animated");
});

// Добавление карточек из cards.js
initialCards.forEach((element) => {
  const cardElement = createCard(
    element.name,
    element.link,
    likeCard,
    openImage
  );
  cardContainer.append(cardElement);
});

// Обработчик событий: кнопка редактирования профиля
profileEditBtn.addEventListener("click", (evt) => {
  const openEditPopup = document.querySelector(".popup_type_edit");

  openModal(openEditPopup);

  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;

  formElementEdit.addEventListener("submit", handleFormEditSubmit);
});

// Обработчик событий: кнопка добавления новой карточки
addBtn.addEventListener("click", (evt) => {
  const openAddPopup = document.querySelector(".popup_type_new-card");

  openModal(openAddPopup);

  formElementNewPlace.addEventListener("submit", handleFormAddSubmit);
});

// Функция редактирования профиля
function handleFormEditSubmit(evt) {
  evt.preventDefault();

  const popup = document.querySelector(".popup_is-opened");
  const profileName = document.querySelector(".profile__title");
  const profileJob = document.querySelector(".profile__description");

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closeModal(popup);
}

// Функция добавления новой карточки в DOM
function handleFormAddSubmit(evt) {
  evt.preventDefault();

  const popup = document.querySelector(".popup_is-opened");
  const newCard = createCard(
    placeNameInput.value,
    imageLinkInput.value,
    likeCard,
    openImage
  );

  cardContainer.prepend(newCard);

  nameInput.value = "";
  imageLinkInput.value = "";

  closeModal(popup);
}

// Функция лайка карточки
function likeCard(cardLikeBtn) {
  cardLikeBtn.classList.toggle("card__like-button_is-active");
}

// Функция открытия попапа изображения
function openImage(cardImage) {
  const imagePopup = document.querySelector(".popup_type_image");
  const img = document.querySelector(".popup__image");
  const imgName = document.querySelector(".popup__caption");
  img.src = cardImage.src;
  imgName.textContent = cardImage.alt;

  openModal(imagePopup);
}
