function createCard(cardName, imageLink, likeCard, openImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");

  cardImage.src = imageLink;
  cardImage.alt = cardName;
  cardTitle.textContent = cardName;

  cardDeleteBtn.addEventListener("click", () => removeCard(cardElement));
  cardLikeBtn.addEventListener("click", () => likeCard(cardLikeBtn));
  cardImage.addEventListener("click", () => openImage(cardImage));

  return cardElement;
}

function removeCard(card) {
  card.remove();
}

export { createCard };
