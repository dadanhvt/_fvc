/**
 * Created by Tinti on 9/27/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.main.employee')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider) {

        $stateProvider
            .state('phaojlar.menu.default.emp-write-report', {
                url: '/emp/write-report',
                templateUrl: 'app/main/employee/write-report/report.tmpl.html',
                controller: 'EmpWriteReportController',
                controllerAs: 'vm',
                resolve: {
                    access: ["Auth", function (Auth) {
                        return Auth.hasRole('EMPA');
                    }]
                }
            })
            .state('phaojlar.menu.default.emp-fb-campaign-require', {
                url: '/emp/fb-campaign-require',
                templateUrl: 'app/main/employee/fb-ads/campaign-require.tmpl.html',
                controller: 'EmpFacebookCampaignController',
                controllerAs: 'vm',
                resolve: {
                    access: ["Auth", function (Auth) {
                        return Auth.hasRole('EMPA');
                    }]
                }
            })
            .state('phaojlar.menu.default.emp-gg-campaign-require', {
                url: '/emp/gg-campaign-require',
                templateUrl: 'app/main/employee/gg-ads/campaign-require.tmpl.html',
                controller: 'EmpGoogleCampaignController',
                controllerAs: 'vm',
                resolve: {
                    access: ["Auth", function (Auth) {
                        return Auth.hasRole('EMPA');
                    }]
                }
            })
    }
})();
