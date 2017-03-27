"use strict";

class Pokemon {
  constructor(name, level) {
    this.name   = name;
    this.level  = level;
  }

  show() {
    console.log(`${this.name}: ${this.level}lvl`);
  }

  valueOf() {
    return this.level;
  }
}

class PokemonList extends Array {
  constructor(...pokemons) {
    super(...pokemons);
  }

  add(name, level) {
    this.push(new Pokemon(name, level));
  }

  show() {
    console.log(`Pokemons in list: ${this.length}`);
    for (let item of this) {
      console.log(`name: ${item.name}, level: ${item.level}`);
    }
    console.log('\r');
  }

  move(target,name) {
    for (let item of this) {
      if (item.name === name) {
        var itemIndex, found;
        itemIndex = this.indexOf(item);
        item = this.splice(itemIndex, 1).shift();
        target.push(item);
      }
    }
  }

  max() {
    const MAX_LEVEL = Math.max.apply(null, this);
    for (let item of this) {
      if (item.level === MAX_LEVEL) {
        return item;
      }
    }
  }
}

const POKEMON_1 = new Pokemon('Psyduck', 3),
      POKEMON_2 = new Pokemon('Bulbasaur', 10),
      POKEMON_3 = new Pokemon('Charmander', 5),
      POKEMON_4 = new Pokemon('Charizard', 7),
      POKEMON_5 = new Pokemon('Squirtle', 4);


const LOST  = new PokemonList(POKEMON_1, POKEMON_2, POKEMON_3);
const FOUND = new PokemonList(POKEMON_4, POKEMON_5);

LOST.show();
FOUND.show();

console.log('-------------------------------\n');

FOUND.add('Jigglypuff', 11);
LOST.show();
FOUND.show();

console.log('-------------------------------\n');

LOST.move(FOUND,'Charmander');

LOST.show();
FOUND.show();

let maxLevel = FOUND.max();
console.log(`Max Level in found-list:\rName: ${maxLevel.name}, level: ${maxLevel.level}`);
