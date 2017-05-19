angular
    .module('PokemonApp')
    .factory('PokemonsService', function($http) {

            return {

                getPokemons: function() {
                    return $http.get('http://pokeapi.co/api/v2/pokemon/?limit=10');
                },

                getPokemon: function(pokemonId) {
                    return $http.get('http://pokeapi.co/api/v2/pokemon/' + pokemonId);
                },

                createPokemon: function(pokemonData) {
                    return $http({
                        method: 'POST',
                        url: 'https://api.backendless.com/v1/data/pokemon',
                        headers: {
                            "application-id": "6F3C11F6-A0FC-C66C-FFCA-E619CDC6BF00",
                            "secret-key": "DB668E23-F92D-0841-FF13-5FCD68136700"

                        },
                        data: pokemonData
                    });
                },

                editPokemon: function (pokemonId, pokemonData) {
                    return $http({
                        method: 'PUT',
                        url: 'https://api.backendless.com/v1/data/pokemon/' + pokemonId,
                        headers: {
                            "application-id": "D87AA1BE-B938-22D6-FFCF-86452D634100",
                            "secret-key": "D9159766-80D3-3213-FF41-3FE21EC7A400"

                        },
                        data: pokemonData
                    });
                },

                deletePokemon: function(pokemonId) {
                    return $http({
                        method: 'DELETE',
                        url: 'https://api.backendless.com/v1/data/pokemon/' + pokemonId,
                        headers: {
                            "application-id": "4B730C92-F81E-236B-FFF0-6651FE882800",
                            "secret-key": "CB6DE86C-6069-86C4-FF1C-9049D5AC9400"

                        }
                    });
                }

            }

        }

    );
