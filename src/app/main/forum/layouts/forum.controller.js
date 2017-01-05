(function() {
    'use strict';

    angular
        .module('app.main.index')
        .controller('ForumLayoutController', ForumLayoutController);

    /* @ngInject */
    function ForumLayoutController(categories,$rootScope) {
        var vm = this;

        init();
        function init() {
            $rootScope.categories = categories.result;
            vm.data =categories.result;
        }
    }
})();
