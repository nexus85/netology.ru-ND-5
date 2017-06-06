"use strict";

let {Pokemon, PokemonList}  = require('./../1.1-es2015/PokemonList'),
    pokemons                = require('./../1.1-es2015/pokemon.json');

let hidenseek = require('./hidenseek');

const POKEMONS = pokemons.map(
    item => new Pokemon(item.name, item.level)
);

const POKEMONS_LIST = new PokemonList(...POKEMONS);

const PATH = 'field';

hidenseek.hide(PATH, POKEMONS_LIST);
hidenseek.seek(PATH);
