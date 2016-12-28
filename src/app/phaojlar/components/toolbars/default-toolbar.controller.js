(function () {
    'use strict';

    angular
        .module('phaojlar.components')
        .controller('DefaultToolbarController', DefaultToolbarController);

    /* @ngInject */
    function DefaultToolbarController($translate, $state, $filter, $mdToast, apiService, $mdSidenav, $timeout, $mdComponentRegistry) {
        var vm = this;
        vm.switchLanguage = switchLanguage;
        vm.signOutClick = signOutClick;
        vm.signinClick = signinClick;
        vm.signupClick = signupClick;
        vm.toggleMenu = toggleMenu;
        vm.profileClick = profileClick;
        vm.homeClick = homeClick;
        vm.messageClick = messageClick;
        vm.upgrateAccountClick = upgrateAccountClick;
        init();
        function init() {
            vm.selectedLanguage = $translate.use();
            vm.isMenuOpen = false;
            vm.hasMenu = false;
            $timeout(function () {
                if ($mdComponentRegistry.get('left')) {
                    vm.hasMenu = true;
                    $mdSidenav('left').onClose(function () {
                        vm.isMenuOpen = false;
                    });
                }
            }, 100);
        }
        function profileClick(){
            $state.go('phaojlar.menu.default.profile');
        }
        function homeClick(){
            $state.go('phaojlar.landing.index');
        }
        function messageClick(){
            $state.go('phaojlar.menu.default.mail');
        }
        function upgrateAccountClick(){
            $state.go('phaojlar.menu.default.upgrate-account');
        }
        function toggleMenu(){
            $mdSidenav('left')
                .toggle()
                .then(function () {
                    if($mdSidenav('left').isOpen()){
                        vm.isMenuOpen = true;
                    }else{
                        vm.isMenuOpen = false;
                    }
                });
        }
        function signinClick(){
            $state.go('phaojlar.slide.signin');
        }
        function signupClick(){
            $state.go('phaojlar.slide.signup');
        }
        function signOutClick(){
            apiService.getAPI(SERVER_SIGNOUT,true, function(){
                $mdToast.show({
                    template: '<md-toast><span flex>' + $filter('translate')('LOGOUT.LOGOUT_SUCCESS') + '</span></md-toast>',
                    position: 'bottom right',
                    hideDelay: 3000
                });
                $state.go('phaojlar.slide.signin');
            });
        }

        function switchLanguage(languageCode) {
            $translate.use(languageCode)
                .then(function () {
                    $mdToast.show(
                        $mdToast.simple()
                            .content($filter('translate')('LANGUAGES.LANGUAGE_CHANGED'))
                            .position('bottom right')
                            .hideDelay(500)
                    );
                });
        }
    }
})();
