// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const cardContainer = document.querySelector(".places__list");

function createCard(cardName, imageLink) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  cardImage.src = imageLink;
  cardImage.alt = cardName;
  cardTitle.textContent = cardName;
  cardDeleteBtn.addEventListener("click", () => removeCard(cardElement));

  return cardElement;
}

function removeCard(card) {
  card.remove();
}

initialCards.forEach((element) => {
  const cardElement = createCard(element.name, element.link);
  cardContainer.append(cardElement);
});
