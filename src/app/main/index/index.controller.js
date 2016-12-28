(function() {
    'use strict';

    angular
        .module('app.main.index')
        .controller('IndexController', IndexController);

    /* @ngInject */
    function IndexController($rootScope, apiService, $mdDialog, $filter, $mdToast) {
        var vm = this;
        init();
        function init() {
        }
    }
})();
