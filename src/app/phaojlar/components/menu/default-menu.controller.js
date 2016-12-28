(function() {
    'use strict';

    angular
        .module('phaojlar.components')
        .controller('DefaultMenuController', DefaultMenuController);

    /* @ngInject */
    function DefaultMenuController($state, $mdSidenav) {
        var vm = this;
        init();
        function init(){

        }
    }
})();
