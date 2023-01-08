const BLACK = "black";
const RED = "red";
const GREEN = "green";
const BLUE = "blue";
const WHITE = "white";

const CREATURE = "mineral";
const MANA = "gem";

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
