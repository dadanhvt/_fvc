/**
 * Created by Tinti on 9/24/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.main.authentication')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider) {
        $translatePartialLoaderProvider.addPart('app/main/authentication');

        $stateProvider
            .state('phaojlar.default.signin', {
                url: '/auth/signin',
                templateUrl: 'app/main/authentication/signin/signin.tmpl.html',
                controller: 'SigninController',
                controllerAs: 'vm',
                resolve: {
                    access: ["Auth", function(Auth) {
                        return Auth.isAnonymous();
                    }]
                }
            })
            .state('phaojlar.default.signup', {
            url: '/auth/signup',
            templateUrl: 'app/main/authentication/signup/signup.tmpl.html',
            controller: 'SignupController',
            controllerAs: 'vm',
            resolve: {
                access: ["Auth", function(Auth) {
                    return Auth.isAnonymous();
                }]
            }
        }).state('phaojlar.menu.default.profile', {
            url: '/auth/profile',
            templateUrl: 'app/main/authentication/profile/profile.tmpl.html',
            controller: 'ProfileController',
            controllerAs: 'vm',
            resolve: {
                access: ["Auth", function(Auth) {
                    return Auth.isAuthenticated();
                }]
            }
        }).state('phaojlar.menu.default.charge-money', {
            url: '/auth/charge-money',
            templateUrl: 'app/main/authentication/charge-money/charge-money.tmpl.html',
            controller: 'ChargeMoneyController',
            controllerAs: 'vm',
            resolve: {
                access: ["Auth", function(Auth) {
                    return Auth.hasRole('CUS');
                }]
            }
        }).state('phaojlar.menu.default.upgrate-account', {
            url: '/auth/upgrate-account',
            templateUrl: 'app/main/authentication/upgrate-account/upgrate-account.tmpl.html',
            controller: 'UpgrateAccountController',
            controllerAs: 'vm',
            resolve: {
                access: ["Auth", function(Auth) {
                    return Auth.hasRole('CUS');
                }]
            }
        }).state('phaojlar.default.find', {
            url: '/auth/find',
            templateUrl: 'app/main/authentication/find/find.tmpl.html',
            controller: 'FindController',
            controllerAs: 'vm'
        })
    }
})();
