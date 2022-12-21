import Player from "./player.js";
import Deck from "./deck.js";

let cards = [
  {
    id: 1,
    type: "mineral",
    name: "Ruby",
    cost: 1,
    color: "red",
    def: 3,
    atk: 1,
    effect: "A cute gem but weak, brittle and not suited for battle.",
  },

  {
    id: 2,
    type: "gem",
    name: "Esmerald",
    cost: 0,
    color: "green",
    effect: "Provides 1 green mana.",
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

StartGame();

function StartGame() {
  const playerHand = document.querySelector(".player-hand");
  const deck = new Deck(cards, playerDeck);
  deck.shuffle();
  const player = new Player(deck);
  player.initialDraw();
  for (let i = 0; i < player.hand.length; i++) {
    playerHand.appendChild(player.hand[i].getHTML());
  }
  console.log(player.deck);
  console.log(player.hand);
}
