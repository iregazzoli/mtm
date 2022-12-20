import Player from "./player.js";
import Deck from "./deck.js";

let cards = [
  {
    id: 1,
    type: "mineral",
    name: "Phosphophyllite",
    cost: 1,
    color: "green",
    def: 3,
    atk: 1,
  },

  {
    id: 2,
    type: "gem",
    name: "Esmeral",
    cost: 0,
    color: "green",
  },
];

let playerDeck = [
  {
    id: 1,
    copies: 6,
  },

  {
    id: 2,
    copies: 4,
  },
];

const deck = new Deck(cards, playerDeck);
const player = new Player(deck);
player.initialDraw();
console.log(player.deck);
console.log(player.hand);
