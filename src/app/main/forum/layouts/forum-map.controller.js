(function() {
    'use strict';

    angular
        .module('app.main.forum')
        .controller('ForumSiteController', ForumSiteController);

    /* @ngInject */
    function ForumSiteController(data, $mdDialog) {
        var vm = this;
        vm.cancel = cancel;
        init();
        function init() {
            vm.data = data;
        }
        function cancel() {
            $mdDialog.cancel();
        }
    }
})();
