let Pokemon = require('./../init/Pokemon');

class PokemonList extends Array {

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
      let pokemon = this.find(item => item.name === name);
      target.push(this.splice(this.indexOf(pokemon), 1)[0]);
  }

  max() {
      const MAX_LEVEL = Math.max(...this);
      return this.find(item => item.level === MAX_LEVEL);
  }
}

module.exports = {
    Pokemon,
    PokemonList
}
