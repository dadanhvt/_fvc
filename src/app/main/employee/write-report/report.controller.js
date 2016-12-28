(function() {
    'use strict';

    angular
        .module('app.main.employee')
        .controller('EmpWriteReportController', EmpWriteReportController);

    /* @ngInject */
    function EmpWriteReportController($mdToast, $scope, $state, $mdDialog, apiService, $rootScope,$filter) {
        var vm = this;
        vm.addReportClick = addReportClick;
        vm.reports = [];
        vm.customers = [];
        vm.openReport = openReport;
        vm.changeCustomer = changeCustomer;
        init();

        function init(){
            apiService.getAPI(SERVER_GETUSERLISTEMP,true, function(e){
                var isSuccess = e.success == 1;
                if(!isSuccess){
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Error')
                            .textContent('Cannot load user list emp! please try again.')
                            .ok('OK!')
                    );
                    return;
                }
                vm.customers = e.result.customers;
                vm.selectedCustomer = vm.customers[0];
            }).then(function(){
                getReports();
            });
        }
        function getReports(){
            apiService.getAPI(SERVER_GETREPORTEMP+"?id="+vm.selectedCustomer.id,true, function(e){
                var isSuccess = e.success == 1;
                if(!isSuccess){
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
        function changeCustomer(){
            getReports();
        }
        function openReport(report, $event){
            $mdDialog.show({
                controller: 'EmpEditReportController',
                controllerAs: 'vm',
                templateUrl: 'app/main/employee/write-report/edit-report-dialog.tmpl.html',
                locals: {
                    report: report,
                    customer: vm.selectedCustomer
                }
            })
                .then(function(edited) {
                    apiService.postAPI(SERVER_EDITREPORTEMP,true, edited, function(e){
                        var isSuccess = e.success == 1;
                        if(!isSuccess){
                            $mdDialog.show(
                                $mdDialog.alert()
                                    .clickOutsideToClose(true)
                                    .title('Error')
                                    .textContent('Edit report cannot be save! please try again.')
                                    .ok('OK!')
                            );
                            return;
                        }
                        $mdToast.show({
                            template: '<md-toast><span flex>Sửa báo cáo thành công.</span></md-toast>',
                            position: 'bottom right',
                            hideDelay: 3000
                        });
                        report.subject = e.result.subject;
                        report.content = e.result.content;
                        report.unread = e.result.unread;
                    });
                }, emailCancel);

            function emailCancel() {
            }
        }
        // opens the compose dialog
        function addReportClick($event) {
            $mdDialog.show({
                controller: 'EmpAddReportController',
                controllerAs: 'vm',
                templateUrl: 'app/main/employee/write-report/add-report-dialog.tmpl.html',
                targetEvent: $event,
                locals: {
                    customer: vm.selectedCustomer
                }
            })
                .then(function(report) {
                    var data = {
                        cus_id: vm.selectedCustomer.id,
                        subject: report.subject,
                        content: report.content
                    };
                    apiService.postAPI(SERVER_ADDREPORTEMP,true, data, function(e){
                        var isSuccess = e.success == 1;
                        if(!isSuccess){
                            $mdDialog.show(
                                $mdDialog.alert()
                                    .clickOutsideToClose(true)
                                    .title('Error')
                                    .textContent('Add report cannot be save! please try again.')
                                    .ok('OK!')
                            );
                            return;
                        }
                        $mdToast.show({
                            template: '<md-toast><span flex>Lưu báo cáo thành công.</span></md-toast>',
                            position: 'bottom right',
                            hideDelay: 3000
                        });
                        vm.reports.unshift(e.result);
                    });
                }, emailCancel);

            function emailCancel() {
            }
        }
    }
})();
