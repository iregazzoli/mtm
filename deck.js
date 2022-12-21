import { allCards } from "./script.js";

export default class Deck {
  constructor(deckSpecs) {
    this.cards = addCards(deckSpecs);
  }

  get numberOfCards() {
    return this.cards.length;
  }

  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }

  draw(amount) {
    const drawnCards = [];
    for (let i = 0; i < amount; i++) drawnCards.push(this.cards.pop());
    return drawnCards;
  }
}

// function addCards(cardsFeature, quantities) {
function addCards(deckSpecs) {
  const cards = [];
  for (let cardSpecs of deckSpecs) {
    for (let card of allCards) {
      if (cardSpecs.id === card.id) {
        for (let i = 0; i < cardSpecs.copies; i++) {
          cards.push(createCard(card));
        }
      }
    }
  }
  return cards;
}

function createCard(cardFeatures) {
  let cardType = cardFeatures.type;
  let cardName = cardFeatures.name;
  let cardCost = cardFeatures.cost;
  let cardColor = cardFeatures.color;
  let cardEffect = cardFeatures.effect;
  let cardId = cardFeatures.id;

  if (cardType === "mineral") {
    let cardAtk = cardFeatures.atk;
    let cardDef = cardFeatures.def;
    return new Creature(cardId, cardName, cardCost, cardColor, cardEffect, cardAtk, cardDef);
  } else if (cardType === "gem") return new Mana(cardId, cardName, cardCost, cardColor, cardEffect);
}

class Card {
  constructor(id, name, cost, color, effect) {
    this.id = id;
    this.name = name;
    this.cost = cost;
    this.color = color;
    this.effect = effect;
  }
}

class Creature extends Card {
  constructor(id, name, cost, color, effect, atk, def) {
    super(id, name, cost, color, effect);
    this.atk = atk;
    this.def = def;
  }

  createManaIcons(cardFrameHeader) {
    for (let i = 0; i < this.cost; i++) {
      let mana = document.createElement("img");
      mana.classList.add("manaIcon", this.color);
      mana.src = `./card_images/mana${this.color}.png`;
      cardFrameHeader.appendChild(mana);
    }
  }

  getHTML() {
    const cardContainer = document.createElement("div");
    const cardBackground = document.createElement("div");
    const cardFrame = document.createElement("div");
    const cardFrameHeader = document.createElement("div"); // Name and mana icons
    const cardFrameType = document.createElement("div"); // Creature vs Mana (vs instant or enchanment on the future)
    const cardFrameText = document.createElement("div"); // Effect Text
    const cardFrameStats = document.createElement("div");
    const cardText = document.createElement("p");
    const cardName = document.createElement("h1");
    const cardType = document.createElement("h1");
    const cardStats = document.createElement("h1");
    const cardImg = document.createElement("img");

    var att = document.createAttribute("card-id");
    att.value = this.id;
    cardContainer.setAttributeNode(att);

    cardContainer.classList.add("card-container");
    cardBackground.classList.add("card-background");
    cardFrame.classList.add("card-frame");
    cardFrameHeader.classList.add("frame-header", this.color);
    cardFrameType.classList.add("card-frame-type", this.color);
    cardFrameText.classList.add("card-frame-text", this.color);
    cardFrameStats.classList.add("card-frame-stats", this.color);
    cardImg.classList.add("frame-art", this.color);
    cardName.classList.add("card-name");
    cardType.classList.add("card-type");
    cardStats.classList.add("card-stats");

    cardStats.innerHTML = `${this.atk} / ${this.def}`;
    cardText.innerHTML = this.effect;
    cardName.innerHTML = this.name;
    cardType.innerHTML = "Creature";
    cardImg.src = `./card_images/${this.name}C.png`;

    cardFrameStats.appendChild(cardStats);
    cardFrameHeader.appendChild(cardName);
    this.createManaIcons(cardFrameHeader);
    cardFrameType.appendChild(cardType);
    cardFrameText.appendChild(cardText);
    cardFrame.append(cardFrameHeader, cardImg, cardFrameType, cardFrameText, cardFrameStats);

    cardBackground.appendChild(cardFrame);
    cardContainer.appendChild(cardBackground);

    return cardContainer;
  }
}

class Mana extends Card {
  constructor(id, name, cost, color, effect) {
    super(id, name, cost, color, effect);
  }

  getHTML() {
    const cardContainer = document.createElement("div");
    const cardBackground = document.createElement("div");
    const cardFrame = document.createElement("div");
    const cardFrameHeader = document.createElement("div"); // Name and mana icons
    const cardFrameType = document.createElement("div"); // Creature vs Mana (vs instant or enchanment on the future)
    const cardFrameText = document.createElement("div"); // Effect Text
    const cardText = document.createElement("p");
    const cardName = document.createElement("h1");
    const cardType = document.createElement("h1");
    const cardImg = document.createElement("img");

    var att = document.createAttribute("card-id");
    att.value = this.id;
    cardContainer.setAttributeNode(att);

    cardContainer.classList.add("card-container");
    cardBackground.classList.add("card-background");
    cardFrame.classList.add("card-frame");
    cardFrameHeader.classList.add("frame-header", this.color);
    cardFrameType.classList.add("card-frame-type", this.color);
    cardFrameText.classList.add("card-frame-text", this.color);
    cardImg.classList.add("frame-art", this.color);
    cardName.classList.add("card-name");
    cardType.classList.add("card-type");

    cardText.innerHTML = this.effect;
    cardName.innerHTML = this.name;
    cardType.innerHTML = "Gem";
    cardImg.src = `./card_images/${this.name}.png`;

    cardFrameHeader.appendChild(cardName);
    cardFrameType.appendChild(cardType);
    cardFrameText.appendChild(cardText);
    cardFrame.append(cardFrameHeader, cardImg, cardFrameType, cardFrameText);

    cardBackground.appendChild(cardFrame);
    cardContainer.appendChild(cardBackground);

    return cardContainer;
  }
}
