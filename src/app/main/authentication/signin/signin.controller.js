(function () {
    'use strict';

    angular
        .module('app.main.authentication')
        .controller('SigninController', SigninController);

    /* @ngInject */
    function SigninController($rootScope, $mdDialog) {
        var vm = this;
        init();
        function init() {
            $mdDialog.cancel();
            $rootScope.showSlide = true;
            vm.user = {
                email: '',
                password: ''
            };
        }
    }
})();
