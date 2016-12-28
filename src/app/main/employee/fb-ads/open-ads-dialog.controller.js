/**
 * Created by Tinti on 10/4/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.main.ads')
        .controller('EmpOpenFacebookAdsController', EmpOpenFacebookAdsController);

    /* @ngInject */
    function EmpOpenFacebookAdsController($scope, $rootScope, apiService, $mdDialog, $filter, $mdToast, data, index) {
        var vm = this;
        vm.cancelClick = cancelClick;
        vm.okClick = okClick;
        vm.formatNumber = formatNumber;
        init();
        function init() {
            vm.data = {
                type: data.type,
                ads: data.ads,
                name: data.name,
                start_date: new Date(Date.parse(data.start_date)),
                end_date: new Date(Date.parse(data.end_date)),
                day_budget: parseInt(data.day_budget),
                total_budget: parseInt(data.total_budget),
                desc: data.desc,
                unread: data.unread
            };
        }

        function formatNumber(i) {
            if (Math.round(i) < 1) {
                return 1;
            }
            return Math.round(i);
        }

        function okClick() {
            apiService.getAPI(SERVER_RUNCAMPAIGNCONFIRM+'?id='+data.id,true, function(e){
                var isSuccess = e.success == 1;
                if(!isSuccess){
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Error')
                            .textContent('Cannot RUNCAMPAIGNCONFIRM! please try again.')
                            .ok('OK!')
                    );
                    return;
                }
                data.unread = 0;
                $mdToast.show({
                    template: '<md-toast><span flex>Đã xác nhận chạy chiến dịch</span></md-toast>',
                    position: 'bottom right',
                    hideDelay: 3000
                });
                $mdDialog.hide(index);
            })
        }

        function cancelClick() {
            $mdDialog.cancel();
        }
    }
})();