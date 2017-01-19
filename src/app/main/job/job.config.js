/**
 * Created by kinhcan on 1/17/2017.
 */
(function () {
    'use strict';

    angular
        .module('app.main.job')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider) {

        $stateProvider
            .state('phaojlar.default.detail', {
                url: '/job/:jobId',
                templateUrl: 'app/main/job/detail-post-job/detail-post-job.tmpl.html',
                controller: 'DetailPostJobController',
                controllerAs: 'vm'
            })
            .state('phaojlar.default.findjob', {
                url: '/find-job',
                templateUrl: 'app/main/job/find-job/find-job.tmpl.html',
                controller: 'FindJobController',
                controllerAs: 'vm'
            })

    }
})();

