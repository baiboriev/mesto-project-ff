function createCard(
  { cardName, cardImageLink, cardId, cardLikes, ownerId, currentUserId },
  likeCard,
  openImage,
  removeCard
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeBtn = cardElement.querySelector(".card__like_button");
  const cardLikeCount = cardElement.querySelector(".card__like_count");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  cardElement.dataset.id = cardId;
  cardImage.src = cardImageLink;
  cardImage.alt = cardName;
  cardTitle.textContent = cardName;
  cardLikeCount.textContent = cardLikes.length;

  if (cardLikes.some((user) => user._id === currentUserId)) {
    cardLikeBtn.classList.add("card__like_button_is-active");
  }

  if (currentUserId === ownerId) {
    cardDeleteBtn.addEventListener("click", () => removeCard(cardId));
  } else {
    cardDeleteBtn.style.display = "none";
  }

  cardLikeBtn.addEventListener("click", () =>
    likeCard(cardLikeBtn, cardId, cardLikeCount)
  );
  cardImage.addEventListener("click", () => openImage(cardName, cardImageLink));

  return cardElement;
}

export { createCard };
