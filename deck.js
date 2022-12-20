export default class Deck {
  constructor(cardsFeature, quantities) {
    this.cards = addCards(cardsFeature, quantities); //cards and quantities are an array of objects
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

function addCards(cardsFeature, quantities) {
  //maybe it should be a method?
  const cards = [];
  for (const cardSpecs of quantities) {
    for (const cardInfo of cardsFeature) {
      if (cardInfo.id === cardSpecs.id) {
        for (let i = 0; i < cardSpecs.copies; i++) {
          cards.push(createCard(cardInfo));
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

  if (cardType === "mineral") {
    let cardAtk = cardFeatures.atk;
    let cardDef = cardFeatures.def;
    return new Creature(cardName, cardCost, cardColor, cardAtk, cardDef);
  } else if (cardType === "gem") return new Mana(cardType, cardName, cardCost, cardColor);
}

class Card {
  constructor(name, cost, color) {
    this.name = name;
    this.cost = cost;
    this.color = color;
  }
}

class Creature extends Card {
  constructor(name, cost, color, atk, def) {
    super(name, cost, color);
    this.atk = atk;
    this.def = def;
  }

  getHTML() {
    const cardDiv = document.createElement("div");
    cardDiv.innerText = "Creature";
    cardDiv.classList.add("card", this.name, this.color);
    cardDiv.dataset.features = `${this.name} ${this.cost} ${this.atk} ${this.def}`;
    return cardDiv;
  }
}

class Mana extends Card {
  constructor(name, cost, color) {
    super(name, cost, color);
  }

  getHTML() {
    const cardDiv = document.createElement("div");
    cardDiv.innerText = "Mana";
    cardDiv.classList.add("card", this.name, this.color);
    cardDiv.dataset.features = `${this.name} ${this.cost}`;
    return cardDiv;
  }
}
