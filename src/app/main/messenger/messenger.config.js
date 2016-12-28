/**
 * Created by duclt on 10/10/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.main.messenger')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {

        $stateProvider
            .state('phaojlar.default.messenger', {
                url: '/messenger',
                templateUrl: 'app/main/messenger/messenger.tmpl.html',
                controller: 'MessengerController',
                controllerAs: 'vm'
            })


    }
})();
