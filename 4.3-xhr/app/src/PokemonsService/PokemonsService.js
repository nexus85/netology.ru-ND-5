angular
    .module('PokemonApp')
    .factory('PokemonsService', function($http) {

            $http.defaults.headers.common = {
                "application-id": "D87AA1BE-B938-22D6-FFCF-86452D634100",
                "secret-key": "D9159766-80D3-3213-FF41-3FE21EC7A400"
            };

            return {

                getPokemons: function() {
                    delete $http.defaults.headers.common["application-id"];
                    delete $http.defaults.headers.common["secret-key"];
                    return $http.get('http://pokeapi.co/api/v2/pokemon/?limit=10');
                },

                getPokemon: function(pokemonId) {
                    return $http.get('http://pokeapi.co/api/v2/pokemon/' + pokemonId);
                },

                createPokemon: function(pokemonData) {
                    return $http({
                        method: 'POST',
                        url: 'https://api.backendless.com/v1/data/pokemon',
                        data: pokemonData
                    });
                },

                editPokemon: function (pokemonId, pokemonData) {
                    return $http({
                        method: 'PUT',
                        url: 'https://api.backendless.com/v1/data/pokemon/' + pokemonId,
                        data: pokemonData
                    });
                },

                deletePokemon: function(pokemonId) {
                    return $http({
                        method: 'DELETE',
                        url: 'https://api.backendless.com/v1/data/pokemon/' + pokemonId,
                    });
                }

            }

        }

    );
