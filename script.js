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

const playerDeck = new Deck(playerDeckSpecs);
playerDeck.shuffle();

const player = new Player(playerDeck);
const playerHand = document.querySelector("#player-hand");
const playerDeckDiv = document.querySelector("#player-deck");
const playerMana = document.querySelector("#player-mana-board");
const playerCreatures = document.querySelector("#player-creature-board");

const opponentDeck = new Deck(opponentDeckSpecs);
opponentDeck.shuffle();
const opponent = new Player(opponentDeck);
const opponentHand = document.querySelector("#opponent-hand");
const opponentDeckDiv = document.querySelector("#opponent-deck");
const opponenttMana = document.querySelector("#opponent-mana-board");
const opponentCreatures = document.querySelector("#opponent-creature-board");

const audioController = new AudioController();

StartGame();

function StartGame() {
  window.addEventListener("mousemove", () => {
    audioController.startBg();
  });

  dealCards();
  makeDecksDealCards(); //eventually i will change it so you draw cards only at the beginning of the turn

  let cards = Array.from(document.getElementsByClassName("card-container"));
  cards.forEach((card) => {
    makeCardPlayable(card);
  });

  const nextTurnButtons = document.getElementsByClassName("next-turn-span");
  for (let button of nextTurnButtons) {
    button.addEventListener("click", () => {
      unTapGems();
      player.resetMana();
      updateManaCount(player);
    });
  }

  const muteButtons = document.getElementsByClassName("mute-unmute-button-span");
  for (let button of muteButtons) {
    button.addEventListener("click", (e) => {
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

  const mineMineralButtons = document.getElementsByClassName("mine-mineral-span");
  const pickAxeCursor = document.getElementById("pickaxe-cursor");
  for (let button of mineMineralButtons) {
    button.addEventListener("click", () => {
      pickAxeCursor.classList.toggle("hidden");
      document.body.style.cursor = "none";
      if (pickAxeCursor.classList.contains("hidden")) document.body.style.cursor = "default";
    });

    document.addEventListener("mousemove", (e) => {
      pickAxeCursor.setAttribute("style", `top: ${e.pageY - 7}px; left: ${e.pageX - 22}px; `);
    });
  }
}

function dealCards() {
  player.draw(INITIAL_AMOUNT_OF_CARDS);

  player.hand.forEach((card) => {
    playerHand.appendChild(card.getHTML());
  });

  opponent.draw(INITIAL_AMOUNT_OF_CARDS);

  opponent.hand.forEach((card) => {
    opponentHand.appendChild(card.getHTML());
  });
}

function makeDecksDealCards() {
  playerDeckDiv.addEventListener("click", () => {
    const drawnCards = player.draw(1); // Still getting the error "TypeError: Cannot read properties of undefined (reading 'getHTML')"
    audioController.drawCard();
    console.log(drawnCards);
    for (let card of drawnCards) {
      const cardDiv = card.getHTML();

      // THIS IS THE IMPORTANT PART
      makeCardPlayable(cardDiv, player, playerHand);
      playerHand.appendChild(cardDiv);
    }
  });

  opponentDeckDiv.addEventListener("click", () => {
    const drawnCards = opponent.draw(1); // Still getting the error "TypeError: Cannot read properties of undefined (reading 'getHTML')"
    audioController.drawCard();
    console.log(drawnCards);
    for (let card of drawnCards) {
      const cardDiv = card.getHTML();
      makeCardPlayable(cardDiv, opponent, opponentHand);
      opponentHand.appendChild(cardDiv);
    }
  });
}

function unTapGems() {
  const manasPlayed = Array.from(playerMana.children);
  manasPlayed.forEach((mana) => {
    if (mana.classList.contains("tapped")) {
      mana.classList.remove("tapped");
    }
  });
}

function playCardFromHand(player, hand) {
  playCard(player, hand);
}

function makeCardPlayable(card, player, hand) {
  //TODO FIX THIS
  card.addEventListener("click", () => {
    playCardFromHand(player, hand);
  });
}

function playCard(player, playerHand) {
  console.log(player);
  console.log(playerHand);
  // finds the correct card id
  const cardId = event.target.attributes["card-id"].value;
  if (player.playCard(Number(cardId))) {
    if (cardId >= 5) {
      audioController.stopMusic();
      audioController.startSex();
    }
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
    if (child.getAttribute("card-id") === cardId) searchedChild = child; //for future reference with this way you end up with a reference to the LAST card in your hand with matching id
  }
  // removes it from .player-hand div
  const playedCard = playerHand.removeChild(searchedChild);

  // removes the event so they can't be play again
  makeCardUnplayable(searchedChild);

  // adds it to the corresponding board
  if (playedCard.getAttribute("card-id") <= 5) {
    //Think later for a way to not hardcode the 5
    playerMana.appendChild(playedCard);
    // adds event so you can tap it
    searchedChild.addEventListener("click", () => {
      if (!searchedChild.classList.contains("tapped")) {
        searchedChild.classList.add("tapped");
        player.provideMana(Number(cardId));
        updateManaCount(player);
      }
    });
  } else {
    playerCreatures.appendChild(playedCard);
    playedCard.addEventListener("click", () => {
      const pickAxeCursor = document.getElementById("pickaxe-cursor");
      if (!pickAxeCursor.classList.contains("hidden")) {
        pickAxeCursor.classList.add("hidden");
        document.body.style.cursor = "default";
        console.log();
        audioController.stopMusic();
        audioController.startDameDaNe();
        player.mineCreature(Number(cardId));
        updateManaCount(player);
        moveCardToGraveyard(playedCard);
        playedCard.classList.add("onGraveyard");
        playedCard.style["z-index"] = player.graveyard.length;
      }
    });
  }
}

function makeCardUnplayable(cardDiv) {
  cardDiv.removeEventListener("click", playCardFromHand);
}

function updateManaCount(player) {
  const manaCount = document.querySelector("#player-mana-count");
  const manaDIVs = Array.from(manaCount.children);
  for (let divs of manaDIVs) {
    divs.children[0].firstChild.data = player.mana[divs.getAttribute("mana-color")];
  }
}

function shakeManaIcon(cardId) {
  //Finds the correct mana icon
  const card = allCards.filter((card) => cardId === card.id)[0];
  let manaCount = document.querySelector("#player-mana-count");
  let manas = Array.from(manaCount.children);
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
