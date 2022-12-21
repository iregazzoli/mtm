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
  let cardEffect = cardFeatures.effect;

  if (cardType === "mineral") {
    let cardAtk = cardFeatures.atk;
    let cardDef = cardFeatures.def;
    return new Creature(cardName, cardCost, cardColor, cardEffect, cardAtk, cardDef);
  } else if (cardType === "gem") return new Mana(cardName, cardCost, cardColor, cardEffect);
}

class Card {
  constructor(name, cost, color, effect) {
    this.name = name;
    this.cost = cost;
    this.color = color;
    this.effect = effect;
  }
}

class Creature extends Card {
  constructor(name, cost, color, effect, atk, def) {
    super(name, cost, color, effect);
    this.atk = atk;
    this.def = def;
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
    cardImg.src = `./card_images/${this.name}.jpg`;

    cardFrameStats.appendChild(cardStats);
    cardFrameHeader.appendChild(cardName);
    cardFrameType.appendChild(cardType);
    cardFrameText.appendChild(cardText);
    cardFrame.append(cardFrameHeader, cardImg, cardFrameType, cardFrameText, cardFrameStats);

    cardBackground.appendChild(cardFrame);
    cardContainer.appendChild(cardBackground);

    return cardContainer;
  }
}

class Mana extends Card {
  constructor(name, cost, color, effect) {
    super(name, cost, color, effect);
  }

  createManaIcons(cardFrameHeader) {
    //Not working
    console.log("bocci");
    for (let i = 0; i < this.cost; i++) {
      let mana = document.createElement("div");
      mana.classList.add("manaIcon", this.color);
      mana.innerHTML = this.color;
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
    const cardText = document.createElement("p");
    const cardName = document.createElement("h1");
    const cardType = document.createElement("h1");
    const cardImg = document.createElement("img");

    this.createManaIcons(cardFrameHeader);

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
    cardImg.src = `./card_images/${this.name}.jpg`;

    cardFrameHeader.appendChild(cardName);
    cardFrameType.appendChild(cardType);
    cardFrameText.appendChild(cardText);
    cardFrame.append(cardFrameHeader, cardImg, cardFrameType, cardFrameText);

    cardBackground.appendChild(cardFrame);
    cardContainer.appendChild(cardBackground);

    return cardContainer;
  }
}
