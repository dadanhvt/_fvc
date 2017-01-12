(function() {
    'use strict';

    angular
        .module('app.main.forum')
        .controller('ForumLayoutController', ForumLayoutController);

    /* @ngInject */
    function ForumLayoutController(categories,$rootScope, $mdDialog) {
        var vm = this;
        vm.openForumMap = openForumMap;

        init();
        function init() {
            $rootScope.categories = categories.result;
            vm.data =categories.result;
        }
        function openForumMap() {
            $mdDialog.show({
                controller: 'ForumSiteController',
                templateUrl: 'app/main/forum/layouts/forum-map.tmpl.html',
                controllerAs: 'vm',
                escapeToClose: true,
                locals: {
                    data: vm.data
                }
            })
        }
    }
})();
