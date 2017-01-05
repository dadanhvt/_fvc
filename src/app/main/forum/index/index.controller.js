(function () {
    'use strict';

    angular
        .module('app.main.forum')
        .controller('ForumIndexController', ForumIndexController);

    /* @ngInject */
    function ForumIndexController($rootScope) {
        var vm = this;

        init();
        function init() {
            vm.categories = $rootScope.categories;
            $rootScope.bracum="";
        }
    }
})();
