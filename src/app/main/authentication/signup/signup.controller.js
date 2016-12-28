(function () {
    'use strict';

    angular
        .module('app.main.authentication')
        .controller('SignupController', SignupController);

    /* @ngInject */
    function SignupController($rootScope, apiService, $mdToast, $filter, $state, $mdDialog) {
        var vm = this;
        vm.signupClick = signupClick;
        vm.websiteRegex = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/;
        init();
        function init() {
            $mdDialog.cancel();
            vm.user = {
                name: '',
                website: '',
                email: '',
                password: '',
                gender: 1
            };
        }

        function signupClick() {
            var param = {
                'name': vm.user.name,
                'email': vm.user.email,
                'password': vm.user.password,
                'gender': vm.user.gender
            };
            apiService.postAPI(SERVER_SIGNUP, true, param, function (e) {
                var isSignUp = e.success == 1;
                if (!isSignUp) {
                    $mdToast.show({
                        template: '<md-toast><span flex>' + $filter('translate')('SIGNUP.MESSAGES.'+e.message) + '</span></md-toast>',
                        position: 'bottom right',
                        hideDelay: 3000
                    });
                    return; // no need to redirect
                }
                $mdToast.show({
                    template: '<md-toast><span flex>' + $filter('translate')('SIGNUP.MESSAGES.'+e.message) + '</span></md-toast>',
                    position: 'bottom right',
                    hideDelay: 3000
                });
                $state.go('phaojlar.default.signin');
            });
        }
    }
})();
