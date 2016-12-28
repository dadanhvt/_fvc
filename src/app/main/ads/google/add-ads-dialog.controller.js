/**
 * Created by Tinti on 10/4/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.main.ads')
        .controller('AddGoogleAdsController', AddGoogleAdsController);

    /* @ngInject */
    function AddGoogleAdsController($scope, $rootScope, apiService, $mdDialog, $filter, $mdToast, addAds, data) {
        var vm = this;
        vm.cancelClick = cancelClick;
        vm.okClick = okClick;
        vm.runAds = addAds;
        vm.changeStartDate = changeStartDate;
        vm.formatNumber = formatNumber;
        vm.typeChange = typeChange;
        vm.changeWebsite = changeWebsite;
        vm.websites = [];
        init();
        function init() {
            apiService.getAPI(SERVER_GETWEBSITELIST,true, function(e){
                var isSuccess = e.success == 1;
                if (!isSuccess) {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Error')
                            .textContent('Cannot get websites list! please try again.')
                            .ok('OK!')
                    );
                    return;
                }
                vm.websites = e.result.websites_user;
            }).then(function(){
                if(data){
                    vm.data = {
                        type: data.type,
                        ads: data.ads,
                        name: data.name,
                        start_date: new Date(Date.parse(data.start_date)),
                        end_date: new Date(Date.parse(data.end_date)),
                        day_budget: parseInt(data.day_budget),
                        total_budget: parseInt(data.total_budget),
                        desc: data.desc,
                        gg_desc: data.gg_desc,
                        gg_title1: data.gg_title1,
                        gg_title2: data.gg_title2,
                        website_id: data.website_id
                    };
                    vm.websites.forEach(function(item, index){
                        if(item.website.id == vm.data.website_id){
                            vm.data.website = item;
                        }
                    });
                    vm.adsType = vm.data.type == "GGDIS"? true:false;
                    vm.isRe = true;
                }else{
                    vm.isRe = false;
                    vm.adsType = false;
                    vm.data = {
                        website_id: vm.websites[0].website.id,
                        website: vm.websites[0],
                        type : "GGNONE",
                        ads : "GG"
                }
                }
            });
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
        function typeChange(){
            vm.data.type = vm.adsType == true?"GGDIS":"GGNONE";
        }
        function changeWebsite(){
            vm.data.website_id = vm.data.website.website.id;
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