export default class Deck {
  constructor(cardsFeature, quantities) {
    this.cards = addCards(cardsFeature, quantities); //cards and quantities are an array of objects
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
    return new Creature(cardType, cardName, cardCost, cardColor, cardAtk, cardDef);
  } else if (cardType === "gem") return new Mana(cardType, cardName, cardCost, cardColor);
}

class Card {
  constructor(type, name, cost, color) {
    this.type = type;
    this.name = name;
    this.cost = cost;
    this.color = color;
  }
}

class Creature extends Card {
  constructor(type, name, cost, color, atk, def) {
    super(type, name, cost, color);
    this.atk = atk;
    this.def = def;
  }
}

class Mana extends Card {
  constructor(type, name, cost, color) {
    super(type, name, cost, color);
  }
}
