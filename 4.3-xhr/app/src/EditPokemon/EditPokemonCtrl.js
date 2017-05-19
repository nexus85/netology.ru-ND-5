pokemonApp.controller('EditPokemonCtrl', function($scope, $routeParams, PokemonsService) {

    $scope.updateSuccess = false;

    PokemonsService.getPokemon($routeParams['pokemonId'])
        .then(response => {
            $scope.pokemon = response.data;
        });

    $scope.editPokemon = function(pokemonId, pokemonData) {
        PokemonsService.editPokemon($scope.pokemon.id, pokemonData)
            .then(response => {
                $scope.updateSuccess = true;
            });
    }

});