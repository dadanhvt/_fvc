(function () {
    'use strict';

    angular
        .module('phaojlar.layouts')
        .controller('DefaultLayoutController', DefaultLayoutController);

    /* @ngInject */
    function DefaultLayoutController($rootScope, config, $state, $mdDialog, apiService, $mdToast, $filter) {
        var vm = this;
        $rootScope.signinDialog = signinDialog;
        $rootScope.signinClick = signinClick;
        $rootScope.signoutClick = signoutClick;
        $rootScope.FBLogin = FBLogin;
        init();
        function init() {
            if (config)
                $rootScope.config = config.config;
        }

        function FBLogin(isPopup) {
            FB.getLoginStatus(function (response) {
                if (response.status === 'connected') {
                    FBLogibAPI(isPopup, response.authResponse.accessToken);
                }
                else {
                    FB.login(function (response1) {
                        if (response1.status === 'connected') {
                            FBLogibAPI(isPopup, response1.authResponse.accessToken);
                        }
                    }, {scope: 'public_profile,email'});
                }
            });
        }
        function FBLogibAPI(isPopup, accessToken){
            FB.api('/me?fields=email,name,link,locale,picture,gender', function (fb_user) {
                var param = {
                    via: 'fb',
                    email: fb_user.email,
                    id: fb_user.id,
                    gender: fb_user.gender,
                    via_link: fb_user.link,
                    locale: fb_user.locale,
                    name: fb_user.name,
                    avatar: fb_user.picture.data.url,
                    accessToken: accessToken
                };
                loginCallAPI(isPopup, param);
            });
        }
        function loginCallAPI(isPopup, param) {
            apiService.postAPI(SERVER_SIGNIN, true, param, function (e) {
                var isLogin = e.success == 1;
                if (!isLogin) {
                    $mdToast.show({
                        template: '<md-toast><span flex>' + $filter('translate')('LOGIN.MESSAGES.' + e.message) + '</span></md-toast>',
                        position: 'bottom right',
                        hideDelay: 3000
                    });
                    return; // no need to redirect
                }
                $mdToast.show({
                    template: '<md-toast><span flex>' + $filter('translate')('LOGIN.MESSAGES.LOGIN_SUCCESS') + '</span></md-toast>',
                    position: 'bottom right',
                    hideDelay: 3000
                });
                $rootScope.user = e.user;
                $rootScope.user.role1= getRole($rootScope.user.role);
                $rootScope.user.avatar = getAvatar($rootScope.user.avatar);
                if (isPopup == true) {
                    $mdDialog.cancel();
                } else {
                    $state.go('phaojlar.default.profile.about', {userId: $rootScope.user.id});
                }
            });
        }
        function signoutClick(isRedirect) {
            apiService.getAPI(SERVER_SIGNOUT, true, function () {
                $mdToast.show({
                    template: '<md-toast><span flex>' + $filter('translate')('LOGOUT.LOGOUT_SUCCESS') + '</span></md-toast>',
                    position: 'bottom right',
                    hideDelay: 3000
                });
                $rootScope.user = undefined;
                if (isRedirect == true) {
                    $state.go('phaojlar.default.signin');
                }
            });
        }

        function signinDialog(isPopup) {
            console.log($state);
            if (isPopup == true && $state.current.name != 'phaojlar.default.signin' && $state.current.name != 'phaojlar.default.signup') {
                $mdDialog.show({
                    controller: 'SigninDialogController',
                    controllerAs: 'vm',
                    clickOutsideToClose: true,
                    templateUrl: 'app/phaojlar/components/sign-in/sign-in.tmpl.html'
                });
            } else {
                $state.go('phaojlar.default.signin');
            }
        }

        function signinClick(isPopup, data) {
            var param = {
                via: 'email',
                email: data.email,
                password: data.password,
                remember: data.remember || false
            };
            loginCallAPI(isPopup,param);
        }
    }
})();
