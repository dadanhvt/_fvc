(function() {
    'use strict';

    angular
        .module('app.main.index')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider) {
        $translatePartialLoaderProvider.addPart('app/main/index');

        $stateProvider
        .state('phaojlar.landing.index', {
            url: '/',
            templateUrl: 'app/main/index/index.tmpl.html',
            controller: 'IndexController',
            controllerAs: 'vm'
        })
    }
})();
