import Player from "./player.js";
import Deck from "./deck.js";

const BLACK = "black";
const RED = "red";
const GREEN = "green";
const BLUE = "blue";
const WHITE = "white";

const CREATURE = "mineral";
const MANA = "gem";

const INITIAL_AMOUNT_OF_CARDS = 5;

export let allCards = [
  {
    id: 1,
    type: MANA,
    name: "Esmerald",
    cost: 0,
    color: GREEN,
    effect: "Provides 1 green mana.",
  },

  {
    id: 2,
    type: MANA,
    name: "Sapphire",
    cost: 0,
    color: BLUE,
    effect: "Provides 1 blue mana.",
  },

  {
    id: 3,
    type: MANA,
    name: "Ruby",
    cost: 0,
    color: RED,
    effect: "Provides 1 red mana.",
  },

  {
    id: 4,
    type: MANA,
    name: "Quartz",
    cost: 0,
    color: WHITE,
    effect: "Provides 1 red mana.",
  },

  {
    id: 5,
    type: MANA,
    name: "Amethyst",
    cost: 0,
    color: BLACK,
    effect: "Provides 1 red mana.",
  },

  {
    id: 6,
    type: CREATURE,
    name: "Phosphophyllite",
    cost: 1,
    color: GREEN,
    def: 2,
    atk: 1,
    effect: "A cute gem but weak, brittle and not suited for battle.",
  },

  {
    id: 7,
    type: CREATURE,
    name: "Sapphire",
    cost: 3,
    color: BLUE,
    def: 2,
    atk: 4,
    effect: "A gem with great observation and deductive thinking skills, because of that she has a great confidence in herself.",
  },

  {
    id: 8,
    type: CREATURE,
    name: "Ruby",
    cost: 3, //Change cost later
    color: RED,
    def: 2,
    atk: 4,
    effect: "A gem with great observation and deductive thinking skills, because of that she has a great confidence in herself.",
  },
];

const playerDeck = [
  {
    id: 6,
    copies: 6,
  },

  {
    id: 1,
    copies: 4,
  },

  {
    id: 7,
    copies: 6,
  },

  {
    id: 2,
    copies: 5,
  },
];

const playerHand = document.querySelector(".player-hand");
const playerDeckDiv = document.querySelector(".player-deck");
const deck = new Deck(playerDeck);
deck.shuffle();
const player = new Player(deck);

StartGame();

function StartGame() {
  player.draw(INITIAL_AMOUNT_OF_CARDS);

  player.hand.forEach((card) => {
    playerHand.appendChild(card.getHTML());
  });

  playerDeckDiv.addEventListener("click", () => {
    const drawnCards = player.draw(1); // Still getting the error "TypeError: Cannot read properties of undefined (reading 'getHTML')"
    console.log(drawnCards);
    for (let card of drawnCards) {
      const cardDiv = card.getHTML();
      makeCardPlayable(cardDiv);
      playerHand.appendChild(cardDiv);
    }
  });

  let cards = Array.from(document.getElementsByClassName("card-container"));
  cards.forEach((card) => {
    makeCardPlayable(card);
  });

  const nextTurnButton = document.getElementById("next-turn-span");
  nextTurnButton.addEventListener("click", () => {
    unTapGems();
    player.resetMana();
    updateManaCount(player);
  });
}

function unTapGems() {
  const manasPlayed = Array.from(document.querySelector(".mana-board").children);
  manasPlayed.forEach((mana) => {
    if (mana.classList.contains("tapped")) {
      mana.classList.remove("tapped");
    }
  });
}

function roma() {
  //TODO ask roma a actual name for this later
  playCard(player, playerHand);
}

function makeCardPlayable(card) {
  card.addEventListener("click", roma);
}

function playCard() {
  const cardId = event.target.attributes["card-id"].value;
  if (player.playCard(Number(cardId))) {
    removeCardFromHand(playerHand, cardId);
    updateManaCount(player);
  } else {
    shakeManaIcon(Number(cardId));
  }
}

function removeCardFromHand(playerHand, cardId) {
  let childs = playerHand.childNodes;
  let searchedChild;

  // obtains the child whos card-id = search id
  for (let child of childs) {
    if (child.getAttribute("card-id") === cardId) searchedChild = child;
  }
  // removes it from .player-hand div
  const playedCard = playerHand.removeChild(searchedChild);

  // removes the event so they can't be play again
  makeCardUnplayable(searchedChild);

  // adds it to the corresponding board
  if (playedCard.getAttribute("card-id") <= 5) {
    //Think later for a way to not hardcode the 5
    document.querySelector(".mana-board").appendChild(playedCard);
    // adds event so you can tap it
    searchedChild.addEventListener("click", () => {
      if (!searchedChild.classList.contains("tapped")) {
        searchedChild.classList.add("tapped");
        player.provideMana(Number(cardId));
        updateManaCount(player);
      }
    });
  } else {
    document.querySelector(".creature-board").appendChild(playedCard);
  }
}

function makeCardUnplayable(cardDiv) {
  cardDiv.removeEventListener("click", roma);
}

function updateManaCount(player) {
  const manaCount = document.querySelector(".mana-count");
  const manaDIVs = Array.from(manaCount.children);
  for (let divs of manaDIVs) {
    divs.children[0].firstChild.data = player.mana[divs.getAttribute("mana-color")];
  }
}

function shakeManaIcon(cardId) {
  const card = allCards.filter((card) => cardId === card.id)[0];
  let manaCount = document.querySelector(".mana-count");
  let manas = Array.from(manaCount.children);
  const manaDiv = manas.filter((mana) => mana.getAttribute("mana-color") === card.color)[0];
  const manaIcon = manaDiv.children[1];

  manaIcon.classList.add("shake");

  function removeShake() {
    manaIcon.classList.remove("shake");
  }
  const interval = window.setInterval(removeShake, 500);
  window.clearInterval(interval);
}
