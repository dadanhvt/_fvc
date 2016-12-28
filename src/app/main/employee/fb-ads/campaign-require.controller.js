(function () {
    'use strict';

    angular
        .module('app.main.employee')
        .controller('EmpFacebookCampaignController', EmpFacebookCampaignController);

    /* @ngInject */
    function EmpFacebookCampaignController($rootScope, apiService, $mdDialog, $filter, $mdToast) {
        var vm = this;
        vm.paginationFirst = paginationFirst;
        vm.paginationPrevious = paginationPrevious;
        vm.paginationNext = paginationNext;
        vm.paginationLast = paginationLast;
        vm.allAdsClick = allAdsClick;
        vm.doneAdsClick = doneAdsClick;
        vm.delayAdsClick = delayAdsClick;
        vm.inprocessAdsClick = inprocessAdsClick;
        vm.openCampaign = openCampaign;
        vm.changeCustomer = changeCustomer;
        vm.campaigns = [];
        init();
        function init() {
            vm.query = {
                status: 'all',
                limit: LIMIT_REPORT_LIST,
                page: 1
            };
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
                getCampaigns();
            });
        }

        function changeCustomer(){
            getCampaigns();
        }
        function getCampaigns(){
            apiService.getAPI(SERVER_GETCAMPAIGNSREQUIRE+'?id='+vm.selectedCustomer.id+'&status='+vm.query.status+'&ads=FB',true, function(e){
                var isSuccess = e.success == 1;
                if(!isSuccess){
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Error')
                            .textContent('Cannot load campaigns! please try again.')
                            .ok('OK!')
                    );
                    return;
                }
                vm.campaigns = e.campaigns;
            });
        }
        function openCampaign(campaign, $event, index) {
            $mdDialog.show({
                parent: angular.element(document.body),
                templateUrl: 'app/main/employee/fb-ads/open-ads-dialog.tmpl.html',
                preserveScope: true,
                autoWrap: true,
                skipHide: true,
                controller: 'EmpOpenFacebookAdsController',
                controllerAs: 'vm',
                locals: {
                    data: campaign,
                    index: index
                }
            }).then(function(index) {
                vm.campaigns.splice(index,1);
            });
        }
        function inprocessAdsClick() {
            vm.query.status = 'INPRO';
            getCampaigns();
        }

        function doneAdsClick() {
            vm.query.status = 'DONE';
            getCampaigns();
        }

        function delayAdsClick() {
            vm.query.status = 'DELAY';
            getCampaigns();
        }

        function allAdsClick() {
            vm.query.status = 'all';
            getCampaigns();
        }
        function paginationFirst() {
            vm.query.page = 1;
            getCampaigns();
        }

        function paginationPrevious() {
            vm.query.page = vm.campaigns.current_page - 1;
            getCampaigns();
        }

        function paginationNext() {
            vm.query.page = vm.campaigns.current_page + 1;
            getCampaigns();
        }

        function paginationLast() {
            vm.query.page = vm.campaigns.last_page;
            getCampaigns();
        }
    }
})();