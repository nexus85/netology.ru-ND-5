'use strict';

angular
    .module('myApp')
    .controller('MyAccountCtrl', function() {
        const vm = this;
        this.data = {};
        this.formActive = true;
        vm.save = info => {
            this.data = info;
            this.formActive = false;
            console.log(this.data);
        }
        vm.edit = () => {
            this.formActive = true;
        }
    });
