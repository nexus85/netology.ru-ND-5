"use strict";

var {Pokemon, PokemonList}  = require('./PokemonList'),
    pokemons                = require('./pokemon.json');

const POKEMONS = pokemons.map(
    item => new Pokemon(item.name, item.level)
);

const LOST  = new PokemonList(POKEMONS[0], POKEMONS[3], POKEMONS[4]);
const FOUND = new PokemonList(POKEMONS[1], POKEMONS[2]);

LOST.show();
FOUND.show();

console.log('-------------------------------\n');

FOUND.add('Jigglypuff', 11);
LOST.show();
FOUND.show();

console.log('-------------------------------\n');

LOST.move(FOUND,'Bulbasaur');

LOST.show();
FOUND.show();

let maxLevel = FOUND.max();
maxLevel.show();
