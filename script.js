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

const audioController = new AudioController();

StartGame();

function StartGame() {
  window.addEventListener("mousemove", () => {
    audioController.startBg();
  });

  const player1Deck = new Deck(playerDeckSpecs);
  player1Deck.shuffle();
  const player1 = new Player(player1Deck, "player1");

  const player2Deck = new Deck(opponentDeckSpecs);
  player2Deck.shuffle();
  const player2 = new Player(player2Deck, "player2");

  let playerPlaying = player1;

  dealCards(player1);
  dealCards(player2);
  makeDecksDealCards(player1); //eventually i will change it so you draw cards only at the beginning of the turn
  makeDecksDealCards(player2);

  setNextTurnButton(playerPlaying, player1, player2);
  setMuteButton();
  setMineButton();
}

//end of startGame

function dealCards(player) {
  player.draw(INITIAL_AMOUNT_OF_CARDS);
  const playerID = player.id;
  const playerHand = document.querySelector(`#${playerID}-hand`);
  player.hand.forEach((card) => {
    const cardDiv = card.getHTML();
    playerHand.appendChild(cardDiv);
    makeCardPlayable(cardDiv, player);
  });
}

function makeDecksDealCards(player) {
  const playerID = player.id;
  const playerDeck = document.querySelector(`#${playerID}-deck`);
  const playerHand = document.querySelector(`#${playerID}-hand`);
  playerDeck.addEventListener("click", () => {
    const drawnCards = player.draw(1); // Still getting the error "TypeError: Cannot read properties of undefined (reading 'getHTML')"
    if (drawnCards[0] !== undefined) {
      audioController.drawCard();
      for (let card of drawnCards) {
        const cardDiv = card.getHTML();

        // THIS IS THE IMPORTANT PART
        makeCardPlayable(cardDiv, player);
        playerHand.appendChild(cardDiv);
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

function makeCardPlayable(card, player) {
  card.addEventListener("click", () => {
    playCard(player, card);
  });
}

function playCard(player, card) {
  // finds the correct card id
  const cardId = event.target.attributes["card-id"].value;
  const playerID = player.id;
  //this is if the card is in the hand
  if (card.getAttribute("location") === "hand") {
    if (player.playCard(Number(cardId))) {
      if (cardId > 5) {
        audioController.stopMusic();
        audioController.startSex();
        updateManaCount(player);
      }
      card.setAttribute("location", "board");
      removeCardFromHand(playerID, card);
    } else {
      shakeManaIcon(Number(cardId), playerID);
    }
  } else if (card.getAttribute("location") === "board") {
    if (card.getAttribute("card-id") <= 5) {
      //Think later for a way to not hardcode the 5
      if (!card.classList.contains("tapped")) {
        card.classList.add("tapped");
        player.provideMana(Number(cardId));
        updateManaCount(player);
      }
    } else {
      const pickAxeCursor = document.getElementById("pickaxe-cursor");
      if (!pickAxeCursor.classList.contains("hidden")) {
        pickAxeCursor.classList.add("hidden");
        document.body.style.cursor = "default";
        audioController.stopMusic();
        audioController.startDameDaNe();
        player.mineCreature(Number(cardId));
        updateManaCount(player);
        moveCardToGraveyard(card, player);
        card.classList.add("onGraveyard");
        card.style["z-index"] = player.graveyard.length;
      }
    }
  }
}

function removeCardFromHand(playerID, card) {
  // removes it from .player-hand div
  const playerhand = document.querySelector(`#${playerID}-hand`);
  const playerlands = document.querySelector(`#${playerID}-mana-board`);
  const playerCreatures = document.querySelector(`#${playerID}-creature-board`);
  const playedCard = playerhand.removeChild(card);

  // adds it to the corresponding board
  if (playedCard.getAttribute("card-id") <= 5) {
    //Think later for a way to not hardcode the 5
    playerlands.appendChild(playedCard);
  } else {
    playerCreatures.appendChild(playedCard);
  }
}

function updateManaCount(player) {
  const playerID = player.id;
  const manaDIVs = Array.from(document.querySelector(`#${playerID}-mana-count`).children);
  for (let divs of manaDIVs) {
    divs.children[0].firstChild.data = player.mana[divs.getAttribute("mana-color")];
  }
}

function shakeManaIcon(cardId, playerID) {
  //Finds the correct mana icon
  const card = allCards.filter((card) => cardId === card.id)[0];
  const playerMana = document.querySelector(`#${playerID}-mana-count`);
  let manas = Array.from(playerMana.children);
  const manaDiv = manas.filter((mana) => mana.getAttribute("mana-color") === card.color)[0];
  const manaIcon = manaDiv.children[1];

  manaIcon.classList.add("shake");

  window.setTimeout(() => {
    manaIcon.classList.remove("shake");
  }, 500);
}

function moveCardToGraveyard(cardDiv, player) {
  const playerID = player.id;
  const playerGraveyardDiv = document.querySelector(`#${playerID}-graveyard`);
  playerGraveyardDiv.appendChild(cardDiv);
}

function setNextTurnButton(playerPlaying, player1, player2) {
  const nextTurnButton = document.getElementById("next-turn-span");
  nextTurnButton.addEventListener("click", () => {
    const playerID = playerPlaying.id;
    const playerLand = document.querySelector(`#${playerID}-mana-board`);

    unTapGems(playerLand);
    playerPlaying.resetMana();
    updateManaCount(playerPlaying);
    if (playerPlaying === player1) {
      playerPlaying = player2;
    } else {
      playerPlaying = player1;
    }
  });
}

function setMuteButton() {
  const muteButton = document.getElementById("mute-unmute-button-span");
  muteButton.addEventListener("click", (e) => {
    audioController.bgMusic.muted = !audioController.bgMusic.muted;
    audioController.sex.muted = !audioController.sex.muted;
    audioController.dameDaNe.muted = !audioController.dameDaNe.muted;

    if (muteButton.classList.contains("unmuted")) {
      muteButton.innerHTML = "volume_up";
    } else {
      muteButton.innerHTML = "volume_off";
    }
    muteButton.classList.toggle("unmuted");
  });
}

function setMineButton() {
  const mineMineralButton = document.getElementById("mine-mineral-span");
  const pickAxeCursor = document.getElementById("pickaxe-cursor");
  mineMineralButton.addEventListener("click", () => {
    pickAxeCursor.classList.toggle("hidden");
    document.body.style.cursor = "none";
    if (pickAxeCursor.classList.contains("hidden")) document.body.style.cursor = "default";
  });

  document.addEventListener("mousemove", (e) => {
    // makeCardPlayable;
    pickAxeCursor.setAttribute("style", `top: ${e.pageY - 7}px; left: ${e.pageX - 22}px; `);
  });
}
