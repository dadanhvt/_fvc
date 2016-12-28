(function() {
    'use strict';

    angular
        .module('app.main.employee')
        .controller('FabController', FabController);

    /* @ngInject */
    function FabController($rootScope) {
        var vm = this;
        vm.addKeyWord = addKeyWord;

        ////////////////

        function addKeyWord($event) {
            $rootScope.$broadcast('addKeyWord', $event);
        }
    }
})();
