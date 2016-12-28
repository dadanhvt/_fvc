/**
 * Created by Tinti on 9/27/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.main.web-analyst')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider) {
        $translatePartialLoaderProvider.addPart('app/main/web-analyst');

        $stateProvider
            .state('phaojlar.menu.default.keywork-ranking', {
                url: '/web-analyst/keywork-ranking',
                templateUrl: 'app/main/web-analyst/keywork-ranking/keywork-ranking.tmpl.html',
                controller: 'KeyworkRankingController',
                controllerAs: 'vm',
                resolve: {
                    access: ["Auth", function (Auth) {
                        return Auth.hasRole('CUS');
                    }]
                }
            })
            .state('phaojlar.menu.default.website-ranking', {
                url: '/web-analyst/website-ranking?website',
                templateUrl: 'app/main/web-analyst/website-ranking/website-ranking.tmpl.html',
                controller: 'WebsiteRankingController',
                controllerAs: 'vm',
                resolve: {
                    access: ["Auth", function (Auth) {
                        return Auth.hasRole('CUS');
                    }]
                }
            })
    }
})();
