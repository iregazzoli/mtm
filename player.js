import Deck from "./deck.js";

export default class Player {
  constructor(deck) {
    this.deck = deck;
    this.hand = [];
  }

  initialDraw() {
    this.hand = this.deck.draw(5);
  }
}
