'use strict';

pokemonApp.controller('CreateBerryCtrl', function($scope, BerriesService) {

    $scope.newBerry = {};

    $scope.createBerry = function(myBerry) {

        var newBerryInstance = new BerriesService(myBerry);
        newBerryInstance.$save({}, function(successResult) {
            // Окей!
            $scope.newBerry = {};

            $scope.newBerryId = successResult.objectId;
            $scope.creationSuccess = true;
        }, function(errorResult) {
            // Не окей..
            $scope.creationSuccess = false;
        });

    }

});
