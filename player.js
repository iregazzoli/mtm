import Deck from "./deck.js";
import { allCards } from "./script.js";

export default class Player {
  constructor(deck) {
    this.deck = deck;
    this.hand = [];
    this.mana = { green: 0, red: 0, blue: 0, black: 0, white: 0 };
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
