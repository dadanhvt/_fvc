(function () {
    'use strict';

    angular
        .module('app', [
            'phaojlar',
            'ngAnimate', 'ngCookies', 'ngSanitize', 'ngMessages', 'ngMaterial', 'ngResource', 'chart.js', 'ngFileUpload',
            'ui.router', 'pascalprecht.translate', 'LocalStorageModule', 'googlechart', 'linkify', 'ui.calendar', 'angularMoment', 'textAngular', 'hljs', 'md.data.table', 'ngFileUpload',
            'app.main','ui-notification','angularFileUpload','angular.filter'
        ])
        .config(function ($httpProvider, $mdDateLocaleProvider) {
            $httpProvider.defaults.withCredentials = true;
            $mdDateLocaleProvider.formatDate = function(date) {
                return date?moment(date).format('DD/MM/YYYY'):null;
            };
        })
        .constant('APP_LANGUAGES', [{
            name: 'LANGUAGES.ENGLISH',
            key: 'en'
        }, {
            name: 'LANGUAGES.VIETNAM',
            key: 'vi'
        }])
        .run(['$rootScope', '$state', 'Auth', '$q', 'User', '$mdToast', function ($rootScope, $state, Auth, $q, User, $mdToast) {
            $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
                $rootScope.isShowPageLoader = false;
                if (error  == Auth.UNAUTHORIZED) {
                    $mdToast.show({
                        template: '<md-toast><span flex>Vui lòng đăng nhập!</span></md-toast>',
                        position: 'bottom right',
                        hideDelay: 3000
                    });
                    $state.go('phaojlar.default.signin');
                } else if (error  == Auth.FORBIDDEN) {
                    $mdToast.show({
                        template: '<md-toast><span flex>Bạn không thể truy cập địa chỉ này</span></md-toast>',
                        position: 'bottom right',
                        hideDelay: 3000
                    });
                    $state.go('phaojlar.landing.index');
                }
            });
            $rootScope.skipSomeAsync = false;
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                $rootScope.isShowPageLoader = true;
                if ($rootScope.skipSomeAsync) {
                    return;
                }
                event.preventDefault();
                User.updateProfile().profile(continueNavigation);
                function continueNavigation (userProfile) {
                    $rootScope.user = userProfile.user || undefined;
                    $rootScope.skipSomeAsync = true;
                    $state.go(toState.name, toParams);
                    $rootScope.skipSomeAsync = false;
                }
            });

            $rootScope.$on('$stateChangeSuccess', function () {
                $rootScope.isShowPageLoader = false;
            });
        }]);
})();
