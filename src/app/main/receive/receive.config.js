/**
 * Created by Tinti on 9/27/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.main.receive')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider) {
        $translatePartialLoaderProvider.addPart('app/main/receive');

        $stateProvider
            .state('phaojlar.menu.default.mail', {
                url: '/receive/mail',
                templateUrl: 'app/main/receive/mail/mail.tmpl.html',
                controller: 'MailController',
                controllerAs: 'vm',
                resolve: {
                    access: ["Auth", function (Auth) {
                        return Auth.isAuthenticated();
                    }]
                }
            })
            .state('phaojlar.menu.default.report', {
                url: '/receive/report',
                templateUrl: 'app/main/receive/report/report.tmpl.html',
                controller: 'ReportController',
                controllerAs: 'vm',
                resolve: {
                    access: ["Auth", function (Auth) {
                        return Auth.hasRole('CUS');
                    }]
                }
            })
    }
})();
