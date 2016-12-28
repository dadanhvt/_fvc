(function() {
    'use strict';

    angular
        .module('app.main.employee')
        .controller('EmpEditReportController', EmpEditReportController);

    /* @ngInject */
    function EmpEditReportController($state, $mdDialog, report, customer) {
        var vm = this;
        vm.cancel = cancel;
        vm.save = save;
        vm.selectedCustomer = customer;
        vm.report = {
            id: report.id,
            subject: report.subject,
            content: report.content
        };

        /////////////////////////

        function save() {
            $mdDialog.hide(vm.report);
        }

        function cancel() {
            $mdDialog.cancel();
        }
    }
})();
