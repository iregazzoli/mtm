export default class Deck {
  constructor(cards) {
    this.cards = cards;
  }
}

class Card {
  constructor(type, name, cost) {
    this.type = type;
    this.name = name;
    this.cost = cost;
  }
}

class Creature extends Card {
  constructor(type, name, cost, atk, def) {
    super(type, name, cost);
    this.atk = atk;
    this.def = def;
  }
}

class Mana extends Card {
  constructor(type, name, cost) {
    super(type, name, cost);
  }
}
