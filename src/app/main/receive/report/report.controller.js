/**
 * Created by Tinti on 9/27/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.main.receive')
        .controller('ReportController', ReportController);

    /* @ngInject */
    function ReportController($rootScope, apiService, $mdToast, $filter, $state, $mdDialog) {
        var vm = this;
        vm.openReport = openReport;
        vm.messageClick = messageClick;
        vm.isUnreadFalse = isUnreadFalse;
        vm.isUnreadTrue =isUnreadTrue;
        vm.paginationFirst = paginationFirst;
        vm.paginationPrevious = paginationPrevious;
        vm.paginationNext = paginationNext;
        vm.paginationLast = paginationLast;
        init();
        vm.reports = [];
        function init() {
            vm.query = {
                isUnread: false,
                limit: LIMIT_REPORT_LIST,
                page: 1
            };
            vm.selectedtabIndex = 1;
            getReport();
        }
        function getReport(){
            apiService.getAPI(SERVER_GETREPORTCUS+"?isunread="+vm.query.isUnread+"&page="+vm.query.page+"&limit="+vm.query.limit, true, function (e) {
                var isSuccess = e.success == 1;
                if (!isSuccess) {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Error')
                            .textContent('getReportEmp fail! please try again.')
                            .ok('OK!')
                    );
                    return;
                }
                vm.reports = e.result;
            });
        }
        function isUnreadFalse(){
            vm.query.isUnread = false;
            getReport();
        }
        function isUnreadTrue(){
            vm.query.isUnread = true;
            getReport();
        }
        function paginationFirst(){
            vm.query.page = 1;
            getReport();
        }
        function paginationPrevious(){
            vm.query.page = vm.reports.current_page - 1;
            getReport();
        }
        function paginationNext(){
            vm.query.page = vm.reports.current_page + 1;
            getReport();
        }
        function paginationLast(){
            vm.query.page = vm.reports.last_page;
            getReport();
        }
        function messageClick(){
            $state.go('phaojlar.menu.default.mail');
        }
        function openReport(report, $event) {
            var data = {
                id: report.id
            };
            apiService.postAPI(SERVER_EDITUNREADREPORT, false, data);
            report.unread = 0;
            $mdDialog.show({
                controller: 'OpenReportController',
                templateUrl: 'app/main/receive/report/open-report-dialog.tmpl.html',
                locals: {
                    report: report
                },
                controllerAs: 'vm',
                targetEvent: $event
            })
                .then(function () {
                }, function () {
                });
        }
    }
})();