"use strict";

let {Pokemon, PokemonList}  = require('./../init/PokemonList'),
    pokemons                = require('./../init/pokemon.json');

let hidenseek = require('./hidenseek');

const POKEMONS = pokemons.map(
    item => new Pokemon(item.name, item.level)
);

const POKEMONS_LIST = new PokemonList(...POKEMONS);

const PATH = 'field';

if (!process.argv[3]) {
    hidenseek.hide(PATH, POKEMONS_LIST)
        .then(() => hidenseek.seek(PATH));
} else if (process.argv[3]) {
    console.log(process.argv);
    if (process.argv[3] === 'seek') {
        hidenseek[process.argv[3]](PATH);
    }
}
