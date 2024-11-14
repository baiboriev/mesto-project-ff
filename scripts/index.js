// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const cardContainer = document.querySelector(".places__list");

function addCard(cardName, imageLink) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = imageLink;
  cardElement.querySelector(".card__image").alt = cardName;
  cardElement.querySelector(".card__title").textContent = cardName;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => removeCard(cardElement));

  cardContainer.append(cardElement);
}

function removeCard(card) {
  card.remove();
}

initialCards.forEach((element) => {
  addCard(element.name, element.link);
});
