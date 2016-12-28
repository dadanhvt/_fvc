/**
 * Created by Tinti on 9/23/2016.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    /* @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        // Setup the apps routes
        // set default routes when no path specified
        $urlRouterProvider.when('', '/');
        $urlRouterProvider.when('/', '/');
        $urlRouterProvider.otherwise('/');
    }
})();
