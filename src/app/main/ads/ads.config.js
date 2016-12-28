/**
 * Created by Tinti on 9/27/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.main.ads')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider) {
        $translatePartialLoaderProvider.addPart('app/main/ads');

        $stateProvider
            .state('phaojlar.menu.default.ads-google', {
                url: '/google/run-ads',
                templateUrl: 'app/main/ads/google/run-ads.tmpl.html',
                controller: 'GoogleRunAdsController',
                controllerAs: 'vm',
                resolve: {
                    access: ["Auth", function (Auth) {
                        return Auth.hasRole('CUS');
                    }]
                }
            })
            .state('phaojlar.menu.default.ads-facebook', {
                url: '/facebook/run-ads',
                templateUrl: 'app/main/ads/facebook/run-ads.tmpl.html',
                controller: 'FacebookRunAdsController',
                controllerAs: 'vm',
                resolve: {
                    access: ["Auth", function (Auth) {
                        return Auth.hasRole('CUS');
                    }]
                }
            })
    }
})();
