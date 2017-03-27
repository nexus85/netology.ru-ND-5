let Pokemon = require('./../init/Pokemon');

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

module.exports = {
    Pokemon,
    PokemonList
}
