(function() {
    'use strict';

    angular
        .module('phaojlar.components')
        .controller('DefaultFooterController', DefaultFooterController);

    /* @ngInject */
    function DefaultFooterController($state) {
        var vm = this;
        vm.click = click;
        function click(){
            $state.go('phaojlar.default.signin');
        }
    }
})();
