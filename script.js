import Player from "./player.js";
import Deck from "./deck.js";

const BLACK = "black";
const RED = "red";
const GREEN = "green";
const BLUE = "blue";
const WHITE = "white";

const CREATURE = "mineral";
const MANA = "gem";

let greenCards = [
  {
    id: 1,
    type: CREATURE,
    name: "Phosphophyllite",
    cost: 1,
    color: GREEN,
    def: 2,
    atk: 1,
    effect: "A cute gem but weak, brittle and not suited for battle.",
  },

  {
    id: 2,
    type: MANA,
    name: "Esmerald",
    cost: 0,
    color: GREEN,
    effect: "Provides 1 green mana.",
  },
];

let greenPlayerDeck = [
  {
    id: 1,
    copies: 6,
  },

  {
    id: 2,
    copies: 4,
  },
];

let blueCards = [
  {
    id: 3,
    type: CREATURE,
    name: "Sapphire",
    cost: 3,
    color: BLUE,
    def: 2,
    atk: 4,
    effect: "A gem with great observation and deductive thinking skills, because of that she has a great confidence in herself.",
  },

  {
    id: 4,
    type: MANA,
    name: "Sapphire",
    cost: 0,
    color: BLUE,
    effect: "Provides 1 blue mana.",
  },
];

let bluePlayerDeck = [
  {
    id: 3,
    copies: 6,
  },

  {
    id: 4,
    copies: 4,
  },
];

let redCards = [
  {
    id: 3,
    type: CREATURE,
    name: "Ruby",
    cost: 3,
    color: RED,
    def: 2,
    atk: 4,
    effect: "A gem with great observation and deductive thinking skills, because of that she has a great confidence in herself.",
  },

  {
    id: 4,
    type: MANA,
    name: "Ruby",
    cost: 0,
    color: RED,
    effect: "Provides 1 red mana.",
  },
];

let redPlayerDeck = [
  {
    id: 3,
    copies: 6,
  },

  {
    id: 4,
    copies: 4,
  },
];

StartGame();

function StartGame() {
  const playerHand = document.querySelector(".player-hand");
  const deck = new Deck(redCards, redPlayerDeck);
  deck.shuffle();
  const player = new Player(deck);
  player.initialDraw();
  for (let i = 0; i < player.hand.length; i++) {
    playerHand.appendChild(player.hand[i].getHTML());
  }
  console.log(player.deck);
  console.log(player.hand);
}
