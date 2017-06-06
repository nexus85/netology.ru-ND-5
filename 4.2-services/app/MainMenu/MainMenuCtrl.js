angular
    .module('myApp')
    .component('mainMenu', {
        controller: function MainMenuCtrl() {
            let items = this.menuItems = [
                {
                    title: 'Список',
                    sref: 'list'
                },
                {
                    title: 'Добавить нового',
                    sref: 'createNewPokemon'
                },
                {
                    title: 'Мой аккаунт',
                    sref: 'myaccount'
                }
            ];
            this.select = function(item) {
                angular.forEach(items, function(item) {
                    item.selected = false;
                });
                item.selected = true;
            };
        },
        templateUrl: 'MainMenu/MainMenu.html'
});