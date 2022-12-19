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
    copies: 3,
  },

  {
    id: 2,
    copies: 2,
  },
];
// console.log(cards);
// console.log(playerDeck);
const deck = new Deck(cards, playerDeck);
console.log(deck.cards);
