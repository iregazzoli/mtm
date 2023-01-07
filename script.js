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
    effect: "Provides 1 white mana.",
  },

  {
    id: 5,
    type: MANA,
    name: "Amethyst",
    cost: 0,
    color: BLACK,
    effect: "Provides 1 black mana.",
  },

  {
    id: 6,
    type: CREATURE,
    name: "Phosphophyllite",
    cost: 1,
    color: GREEN,
    sacrifice: 1,
    def: 2,
    atk: 1,
    effect: "A cute gem but weak, brittle and not suited for battle.",
  },

  {
    id: 7,
    type: CREATURE,
    name: "Jade",
    cost: 4,
    color: GREEN,
    sacrifice: 3,
    def: 5,
    atk: 5,
    effect: "A very serious gem yet playfully and with humor.",
  },

  {
    id: 8,
    type: CREATURE,
    name: "Sapphire",
    cost: 3,
    color: BLUE,
    sacrifice: 2,
    def: 2,
    atk: 4,
    effect: "A gem with great observation and deductive thinking skills, because of that she has a great confidence in herself.",
  },

  {
    id: 9,
    type: CREATURE,
    name: "Ruby",
    cost: 2,
    sacrifice: 4,
    color: RED,
    def: 3,
    atk: 0,
    effect: "A gem burning passion ready to put her life in line for the sake of her companions.",
  },

  {
    id: 10,
    type: CREATURE,
    name: "Obsidian",
    cost: 2,
    sacrifice: 1,
    color: BLACK,
    def: 2,
    atk: 2,
    effect: "A gem very dedicated to their job and will make others weapons without hesitation if requested to.",
  },
];

const playerDeckSpecs = [
  {
    id: 9,
    copies: 3,
  },

  {
    id: 6,
    copies: 3,
  },

  {
    id: 1,
    copies: 3,
  },

  {
    id: 3,
    copies: 4,
  },
];

const opponentDeckSpecs = [
  {
    id: 10,
    copies: 4,
  },

  {
    id: 8,
    copies: 2,
  },

  {
    id: 5,
    copies: 4,
  },

  {
    id: 2,
    copies: 3,
  },
];

class AudioController {
  constructor() {
    this.bgMusic = new Audio("./audio/bg.mp3");
    this.bgMusic.loop = true;
    this.sex = new Audio("./audio/sex.mp3");
    this.dameDaNe = new Audio("./audio/dame_da_ne.mp3");
    this.drawCardEffect = new Audio("./audio/deal_card.mp3");
    this.bgMusic.volume = 0.1;
    this.sex.volume = 0.02;
    this.dameDaNe.volume = 0.02;
  }

  startBg() {
    this.bgMusic.play();
  }
  stopMusic() {
    this.bgMusic.pause();
    this.dameDaNe.pause();
    this.sex.pause();
  }
  startDameDaNe() {
    this.dameDaNe.addEventListener("ended", (e) => {
      this.startBg();
    });
    this.dameDaNe.play();
  }
  startSex() {
    this.sex.addEventListener("ended", (e) => {
      this.startBg();
    });
    this.sex.play();
  }
  drawCard() {
    this.drawCardEffect.play();
  }
}

class PlayerRepresentation {
  //change for player
  constructor(player, playerHand, playerDeck, playerLands, playerMana, playerCreatures) {
    this.player = player;
    this.hand = playerHand;
    this.deck = playerDeck;
    this.lands = playerLands;
    this.mana = playerMana;
    this.creatures = playerCreatures;
  }
}

const audioController = new AudioController();

StartGame();

function StartGame() {
  window.addEventListener("mousemove", () => {
    audioController.startBg();
  });

  const player1Deck = new Deck(playerDeckSpecs);
  player1Deck.shuffle();

  const player1 = new Player(player1Deck);
  const player1Hand = document.querySelector("#player-hand");
  const player1DeckDiv = document.querySelector("#player-deck");
  const player1Lands = document.querySelector("#player-mana-board");
  const player1Mana = document.querySelector("#player-mana-count");
  const player1Creatures = document.querySelector("#player-creature-board");

  const player2Deck = new Deck(opponentDeckSpecs);
  player2Deck.shuffle();
  const player2 = new Player(player2Deck);
  const player2Hand = document.querySelector("#opponent-hand");
  const player2DeckDiv = document.querySelector("#opponent-deck");
  const player2Lands = document.querySelector("#opponent-mana-board");
  const player2Mana = document.querySelector("#opponent-mana-count");
  const player2Creatures = document.querySelector("#opponent-creature-board");

  const player1Representation = new PlayerRepresentation(player1, player1Hand, player1DeckDiv, player1Lands, player1Mana, player1Creatures);
  const player2Representation = new PlayerRepresentation(player2, player2Hand, player2DeckDiv, player2Lands, player2Mana, player2Creatures);

  let playerPlaying = player1Representation;

  dealCards(player1Representation);
  dealCards(player2Representation);
  makeDecksDealCards(player1Representation); //eventually i will change it so you draw cards only at the beginning of the turn
  makeDecksDealCards(player2Representation);

  // let cards = Array.from(document.getElementsByClassName("card-container")); //Fix this
  // cards.forEach((card) => {
  //   makeCardPlayable(card);
  // });

  const nextTurnButtons = document.getElementsByClassName("next-turn-span");
  for (let button of nextTurnButtons) {
    button.addEventListener("click", () => {
      unTapGems(playerPlaying.lands);
      playerPlaying.player.resetMana();
      updateManaCount(playerPlaying);
      if (playerPlaying.player === player1) {
        playerPlaying = player2Representation;
      } else {
        playerPlaying = player1Representation;
      }
    });
  }

  const muteButtons = document.getElementsByClassName("mute-unmute-button-span");
  for (let button of muteButtons) {
    button.addEventListener("click", (e) => {
      audioController.bgMusic.muted = !audioController.bgMusic.muted;
      audioController.sex.muted = !audioController.sex.muted;
      audioController.dameDaNe.muted = !audioController.dameDaNe.muted;

      if (button.classList.contains("unmuted")) {
        button.innerHTML = "volume_up";
      } else {
        button.innerHTML = "volume_off";
      }
      button.classList.toggle("unmuted");
    });
  }

  const mineMineralButtons = document.getElementsByClassName("mine-mineral-span");
  const pickAxeCursor = document.getElementById("pickaxe-cursor");
  for (let button of mineMineralButtons) {
    button.addEventListener("click", () => {
      pickAxeCursor.classList.toggle("hidden");
      document.body.style.cursor = "none";
      if (pickAxeCursor.classList.contains("hidden")) document.body.style.cursor = "default";
    });

    document.addEventListener("mousemove", (e) => {
      // makeCardPlayable;
      pickAxeCursor.setAttribute("style", `top: ${e.pageY - 7}px; left: ${e.pageX - 22}px; `);
    });
  }
}

//end of startGame

function dealCards(playerRepresentation) {
  playerRepresentation.player.draw(INITIAL_AMOUNT_OF_CARDS);

  playerRepresentation.player.hand.forEach((card) => {
    const cardDiv = card.getHTML();
    playerRepresentation.hand.appendChild(cardDiv);
    makeCardPlayable(cardDiv, playerRepresentation);
  });
}

function makeDecksDealCards(playerRepresentation) {
  playerRepresentation.deck.addEventListener("click", () => {
    const drawnCards = playerRepresentation.player.draw(1); // Still getting the error "TypeError: Cannot read properties of undefined (reading 'getHTML')"
    if (drawnCards[0] !== undefined) {
      audioController.drawCard();
      for (let card of drawnCards) {
        const cardDiv = card.getHTML();

        // THIS IS THE IMPORTANT PART
        makeCardPlayable(cardDiv, playerRepresentation);
        playerRepresentation.hand.appendChild(cardDiv);
      }
    }
  });
}

function unTapGems(playerMana) {
  const manasPlayed = Array.from(playerMana.children);
  manasPlayed.forEach((mana) => {
    if (mana.classList.contains("tapped")) {
      mana.classList.remove("tapped");
    }
  });
}

function makeCardPlayable(card, playerRepresentation) {
  card.addEventListener("click", () => {
    playCard(playerRepresentation, card);
  });
}

function playCard(playerRepresentation, card) {
  // finds the correct card id
  const cardId = event.target.attributes["card-id"].value;
  //this is if the card is in the hand
  if (card.getAttribute("location") === "hand") {
    if (playerRepresentation["player"].playCard(Number(cardId))) {
      if (cardId > 5) {
        audioController.stopMusic();
        audioController.startSex();
        updateManaCount(playerRepresentation);
      }
      card.setAttribute("location", "board");
      removeCardFromHand(playerRepresentation, card);
    } else {
      shakeManaIcon(Number(cardId), playerRepresentation.mana);
    }
  } else if (card.getAttribute("location") === "board") {
    if (card.getAttribute("card-id") <= 5) {
      //Think later for a way to not hardcode the 5
      // adds event so you can tap it
      if (!card.classList.contains("tapped")) {
        card.classList.add("tapped");
        playerRepresentation.player.provideMana(Number(cardId));
        updateManaCount(playerRepresentation);
      }
    } else {
      const pickAxeCursor = document.getElementById("pickaxe-cursor");
      if (!pickAxeCursor.classList.contains("hidden")) {
        pickAxeCursor.classList.add("hidden");
        document.body.style.cursor = "default";
        audioController.stopMusic();
        audioController.startDameDaNe();
        playerRepresentation.player.mineCreature(Number(cardId));
        updateManaCount(playerRepresentation);
        moveCardToGraveyard(card);
        card.classList.add("onGraveyard");
        card.style["z-index"] = playerRepresentation.player.graveyard.length;
      }
    }
  }
}

function removeCardFromHand(playerRepresentation, card) {
  // removes it from .player-hand div
  const playedCard = playerRepresentation.hand.removeChild(card);

  // adds it to the corresponding board
  if (playedCard.getAttribute("card-id") <= 5) {
    //Think later for a way to not hardcode the 5
    playerRepresentation.lands.appendChild(playedCard);
  } else {
    playerRepresentation.creatures.appendChild(playedCard);
  }
}

function makeCardUnplayable(cardDiv, playCardFromHand) {
  console.log("hey");
  cardDiv.removeEventListener("click", playCardFromHand);
}

function updateManaCount(playerRepresentation) {
  const manaDIVs = Array.from(playerRepresentation.mana.children);
  for (let divs of manaDIVs) {
    divs.children[0].firstChild.data = playerRepresentation.player.mana[divs.getAttribute("mana-color")];
  }
}

function shakeManaIcon(cardId, playerMana) {
  //Finds the correct mana icon
  const card = allCards.filter((card) => cardId === card.id)[0];
  let manas = Array.from(playerMana.children);
  const manaDiv = manas.filter((mana) => mana.getAttribute("mana-color") === card.color)[0];
  const manaIcon = manaDiv.children[1];

  manaIcon.classList.add("shake");

  window.setTimeout(() => {
    manaIcon.classList.remove("shake");
  }, 500);
}

function moveCardToGraveyard(cardDiv) {
  const playerGraveyardDiv = document.querySelector("#player-graveyard");
  playerGraveyardDiv.appendChild(cardDiv);
}
