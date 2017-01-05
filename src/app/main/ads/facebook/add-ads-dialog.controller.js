/**
 * Created by Tinti on 10/4/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.main.ads')
        .controller('AddFacebookAdsController', AddFacebookAdsController);

    /* @ngInject */
    function AddFacebookAdsController($scope, $rootScope, apiService, $mdDialog, $filter, $mdToast, addAds, data) {
        var vm = this;
        vm.cancelClick = cancelClick;
        vm.okClick = okClick;
        vm.runAds = addAds;
        vm.changeStartDate = changeStartDate;
        vm.formatNumber = formatNumber;
        init();
        function init() {
            if(data){
                vm.data = {
                    type: data.type,
                    ads: data.ads,
                    name: data.name,
                    start_date: new Date(Date.parse(data.start_date)),
                    end_date: new Date(Date.parse(data.end_date)),
                    day_budget: parseInt(data.day_budget),
                    total_budget: parseInt(data.total_budget),
                    desc: data.desc
                };
                vm.isRe = true;
            }else{
                vm.isRe = false;
                vm.data = {
                    type : "FBPAGE",
                    ads : "FB"
                }
            }
            var date = new Date();
            vm.minStartDate = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate()+1);
            vm.minEndDate = new Date(
                vm.minStartDate.getFullYear(),
                vm.minStartDate.getMonth(),
                vm.minStartDate.getDate()+1);
        }
        function formatNumber(i){
            if(Math.round(i) <1) {
                return 1;
            }
            return Math.round(i);
        }
        function changeStartDate(minStartDate){
            vm.data.end_date = '';
            vm.minEndDate = new Date(
                minStartDate.getFullYear(),
                minStartDate.getMonth(),
                minStartDate.getDate()+1);
        }
        function okClick() {
            vm.data.total_budget = formatNumber((vm.data.end_date - vm.data.start_date)/86400000)*vm.data.day_budget;
            var confirm = $mdDialog.confirm()
                .title('Xác nhận chạy chiến dịch')
                .textContent('Bạn có chắc muốn sử dụng '+vm.data.total_budget+' để chạy chiến dịch này')
                .ok('Chạy chiến dịch')
                .cancel('Quay lại');

            $mdDialog.show(confirm).then(function() {
                addAds(vm.data, true);
            }, function() {
                addAds(vm.data);
            });
        }
        function cancelClick() {
            $mdDialog.cancel();
        }
    }
})();
