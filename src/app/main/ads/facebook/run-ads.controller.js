(function () {
    'use strict';

    angular
        .module('app.main.ads')
        .controller('FacebookRunAdsController', FacebookRunAdsController);

    /* @ngInject */
    function FacebookRunAdsController($rootScope, apiService, $mdDialog, $filter, $mdToast) {
        var vm = this;
        vm.paginationFirst = paginationFirst;
        vm.paginationPrevious = paginationPrevious;
        vm.paginationNext = paginationNext;
        vm.paginationLast = paginationLast;
        vm.runAds = runAds;
        vm.allAdsClick = allAdsClick;
        vm.doneAdsClick = doneAdsClick;
        vm.delayAdsClick = delayAdsClick;
        vm.inprocessAdsClick = inprocessAdsClick;
        vm.openCampaign = openCampaign;
        vm.campaigns = [];
        init();
        function init() {
            vm.query = {
                status: 'all',
                limit: LIMIT_REPORT_LIST,
                page: 1
            };
            getCampaigns();
        }

        function getCampaigns() {
            apiService.getAPI(SERVER_GETCAMPAIGNS + '?status=' + vm.query.status + '&ads=FB', true, function (e) {
                var isSuccess = e.success == 1;
                if (!isSuccess) {
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

        function openCampaign(campaign, $event) {
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

        function runAds(data, accept) {
            if (data && accept == true) {
                var data1 = {
                    start_date: data.start_date.getFullYear() + '-' + (data.start_date.getMonth() + 1) + '-' + data.start_date.getDate(),
                    end_date: data.end_date.getFullYear() + '-' + (data.end_date.getMonth() + 1) + '-' + data.end_date.getDate(),
                    ads: data.ads,
                    type: data.type,
                    desc: data.desc,
                    name: data.name,
                    day_budget: data.day_budget,
                    total_budget: data.total_budget
                };
                apiService.postAPI(SERVER_ADDCAMPAIGN, true, data1, function (e) {
                    var isSuccess = e.success == 1;
                    if (!isSuccess) {
                        if (e.message == "FB_MIN_BUDGET" || e.message == "GG_MIN_BUDGET") {
                            $mdToast.show({
                                template: '<md-toast><span flex>Ngân sách một ngày tối thiểu ' + e.min + '</span></md-toast>',
                                position: 'bottom right',
                                hideDelay: 5000
                            });
                        } else {
                            $mdToast.show({
                                template: '<md-toast><span flex>' + $filter('translate')('CAMPAIGN.MESSAGES.' + e.message) + '</span></md-toast>',
                                position: 'bottom right',
                                hideDelay: 3000
                            });
                        }
                        runAds(data);
                    } else {
                        $mdToast.show({
                            template: '<md-toast><span flex>Đã thêm chiến dịch thành công</span></md-toast>',
                            position: 'bottom right',
                            hideDelay: 3000
                        });
                        if (vm.query.status == 'all' || vm.query.status == 'INPRO') {
                            vm.campaigns.unshift(e.campaign);
                        }
                        $rootScope.user.wallet = $rootScope.user.wallet - data1.total_budget;
                    }

                });
            } else {
                $mdDialog.show({
                    parent: angular.element(document.body),
                    templateUrl: 'app/main/ads/facebook/add-ads-dialog.tmpl.html',
                    preserveScope: true,
                    autoWrap: true,
                    skipHide: true,
                    controller: 'AddFacebookAdsController',
                    controllerAs: 'vm',
                    locals: {
                        addAds: vm.runAds,
                        data: data
                    }
                });
            }
        }

        function paginationFirst() {
            vm.query.page = 1;
            getReport();
        }

        function paginationPrevious() {
            vm.query.page = vm.reports.current_page - 1;
            getReport();
        }

        function paginationNext() {
            vm.query.page = vm.reports.current_page + 1;
            getReport();
        }

        function paginationLast() {
            vm.query.page = vm.reports.last_page;
            getReport();
        }
    }
})();