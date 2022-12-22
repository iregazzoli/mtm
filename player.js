import Deck from "./deck.js";
import { allCards } from "./script.js";

export default class Player {
  constructor(deck) {
    this.deck = deck;
    this.hand = [];
    this.mana = 0;
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
    if (card.cost <= this.mana) {
      this.removeCardFromHand(cardId);
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
}

function getCard(cardId) {
  return allCards.filter((card) => cardId === card.id)[0];
}
