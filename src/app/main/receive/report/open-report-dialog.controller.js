(function() {
    'use strict';

    angular
        .module('app.main.receive')
        .controller('OpenReportController', OpenReportController);

    /* @ngInject */
    function OpenReportController($state, $mdDialog, report) {
        var vm = this;
        vm.cancel = cancel;
        vm.report = report;

        /////////////////////////

        function cancel() {
            $mdDialog.cancel();
        }
    }
})();
