import { allCards } from "./cardsDB.js";

export default class Player {
  constructor(deck, id) {
    this.deck = deck;
    this.hand = [];
    this.graveyard = [];
    this.mana = { green: 0, red: 0, blue: 0, black: 0, white: 0 };
    this.id = id;
  }

  draw(amount) {
    const drawnCards = [];
    for (let i = 0; i < amount; i++) {
      const drawnCard = this.deck.drawCard();
      drawnCards.push(drawnCard);
      this.hand.push(drawnCard);
    }
    return drawnCards;
  }

  playCard(cardId) {
    const card = getCard(cardId);
    const cardColor = card.color;
    if (card.cost <= this.mana[cardColor]) {
      this.removeCardFromHand(cardId);
      this.mana[cardColor] -= card.cost;
      return true;
    } else {
      console.log("Not enough mana");
      return false;
    }
  }

  mineCreature(cardId) {
    const card = getCard(cardId);
    const manaColor = card.color;
    const cardSacrificeAmount = card.sacrifice;
    this.mana[manaColor] += cardSacrificeAmount;
    this.sendCardToGraveyard(card);
  }

  sendCardToGraveyard(card) {
    //for the moment this receives the card maybe in the future it will be the cardId
    this.graveyard.push(card);
  }

  removeCardFromHand(cardId) {
    const cardIndex = this.hand.findIndex((card) => card.id === cardId);
    if (cardIndex > -1) {
      this.hand.splice(cardIndex, 1);
    }
  }

  provideMana(cardId) {
    const card = allCards.filter((card) => cardId === card.id)[0];
    const manaColor = card.color;
    this.mana[manaColor] += 1;
    return manaColor;
  }

  resetMana() {
    this.mana = { green: 0, red: 0, blue: 0, black: 0, white: 0 };
  }
}

function getCard(cardId) {
  return allCards.filter((card) => cardId === card.id)[0];
}
