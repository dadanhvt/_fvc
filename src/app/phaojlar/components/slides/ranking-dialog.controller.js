/**
 * Created by Tinti on 9/26/2016.
 */
(function() {
    'use strict';

    angular
        .module('phaojlar.components')
        .controller('RankingDialogController', RankingDialogController);

    /* @ngInject */
    function RankingDialogController($window, $mdDialog, keyworks, website, apiService, $mdToast, $rootScope) {
        var vm = this;
        vm.cancelClick = cancelClick;
        vm.okClick = okClick;
        vm.printClick = printClick;
        vm.keyworks = [];
        initData();

        function initData(){
            vm.website = website;
            for(var i = 0; i < keyworks.length; i++){
                var k = [];
                k.name = keyworks[i];
                vm.keyworks.push(k);
            }
            vm.orderBy = 'name';
            vm.keyworks.forEach(function(item, index){
                item.rank = -2;
                var data = {
                    website: vm.website.toLowerCase(),
                    keywork: item.name.toLowerCase()
                };
                apiService.postAPI(SERVER_RANKINGTRAILER,false, data, function(e){
                    var isSuccess = e.success == 1;
                    if(!isSuccess){
                        item.rank = 101;
                        return;
                    }
                    item.rank = e.result.rank;
                    item.url = e.result.url;
                }, function(){
                    item.rank = 101;
                })
            });
        }

        function okClick() {
            $mdDialog.hide();
        }
        function cancelClick() {
            $mdDialog.cancel();
        }
        function printClick() {
            $window.print();
        }
    }
})();
