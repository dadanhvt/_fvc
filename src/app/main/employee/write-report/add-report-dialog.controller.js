(function() {
    'use strict';

    angular
        .module('app.main.employee')
        .controller('EmpAddReportController', EmpAddReportController);

    /* @ngInject */
    function EmpAddReportController($state, $mdDialog, customer) {
        var vm = this;
        vm.cancel = cancel;
        vm.send = send;
        vm.selectedCustomer = customer;
        vm.report = {
            subject: '',
            content: ''
        };

        /////////////////////////

        function send() {
            $mdDialog.hide(vm.report);
        }

        function cancel() {
            $mdDialog.cancel();
        }
    }
})();
