const AVAILABLE_IMAGES = 51;
var first = null;
var second = null;

window.onload = () => {
  loadCards(16);
  document.getElementById("refresh").onclick = () => {
    loadCards(16);
  };
};

function loadCards(quantity) {
  var first = null;
  var second = null;
  const olds = document.querySelectorAll(".card");
  olds.forEach((card) => card.remove());
  const imagesQuantity = quantity / 2;
  const numbers = getRandomNumbers(imagesQuantity);
  const cards = shuffleList(numbers);
  insertImages(cards);
}

function insertImages(images) {
  const main = document.getElementById("main");
  images.forEach((image, index) => {
    const div = document.createElement("div");
    div.setAttribute("id", index);
    div.setAttribute("data-image", image);
    div.setAttribute("class", "card");
    div.onclick = onCardClick;
    main.insertBefore(div, main.firstChild);
  });
}

function onCardClick(envt) {
  if (envt.target.classList.contains("card-flipped")) {
    return;
  }
  if (first && second) {
    if (first.image !== second.image) {
      hideCards([first.id, second.id]);
    }
    first = null;
    second = null;
  }

  showCard(envt.target);

  const image = envt.target.dataset.image;
  const id = envt.target.id;

  if (first) {
    second = { id, image };
  } else {
    first = { id, image };
  }
}

function hideCards(cards) {
  cards.forEach((card) => {
    const element = document.getElementById(card);
    element.classList.remove("card-flipped");
    element.style.backgroundImage = 'url("assets/card-bg.webp")';
  });
}

function showCard(element) {
  element.style.backgroundImage = `url("assets/cards/${element.dataset.image}.png")`;
  element.setAttribute("class", "card card-flipped");
}

function shuffleList(input) {
  let cards = [];
  const list = [...input];
  const quantity = list.length;
  for (let i = 0; i < quantity; i++) {
    const index = getRandomInteger(0, list.length - 1);
    cards.push(list[index]);
    list.splice(index, 1);
  }
  return cards;
}

function getRandomNumbers(quantity) {
  let images = [];
  for (let i = 0; i < quantity; i++) {
    let random = getRandomInteger(1, AVAILABLE_IMAGES);
    while (images.includes(random)) {
      random = getRandomInteger(1, AVAILABLE_IMAGES);
    }
    images.push(random);
    images.push(random);
  }
  return images;
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
