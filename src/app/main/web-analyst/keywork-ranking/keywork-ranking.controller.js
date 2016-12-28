/**
 * Created by Tinti on 9/27/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.main.web-analyst')
        .controller('KeyworkRankingController', KeyworkRankingController);

    /* @ngInject */
    function KeyworkRankingController($rootScope, apiService, $mdToast, $filter, $state, $mdDialog) {
        var vm = this;
        vm.websites = [];
        vm.keyWords = [];
        vm.getKeyworks = getKeyworks;
        vm.addKeyworks = addKeyworks;
        vm.goUrl = goUrl;
        vm.checkRanking = checkRanking;
        vm.deleteKeywork = deleteKeywork;
        init();
        function checkRanking(){
            vm.keyWords.forEach(function(item, index){
                item.rank = -2;
                apiService.getAPI(SERVER_GETKEYWORKRANKING+"?id="+item.id,false, function(e){
                    var isSuccess = e.success == 1;
                    if(!isSuccess){
                        item.rank = 101;
                        return;
                    }
                    item.rank = e.result.rank;
                    item.url = e.result.url;
                    item.last = e.result.last;
                }, function(){
                    item.rank = 101;
                })
            });
        }
        function addKeyworks(){
            var data={
                webowner_id: vm.selectedWebsite.id,
                keyworks: vm.newKeyWord.trim()
            };
            apiService.postAPI(SERVER_ADDKEYWORK,true, data, function(e){
                var isSuccess = e.success == 1;
                if(!isSuccess){
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Error')
                            .textContent('Update cannot be save! please try again.')
                            .ok('OK!')
                    );
                    return;
                }
                vm.keyWords = vm.keyWords.concat(e.newKeyWords);
                $mdToast.show({
                    template: '<md-toast><span flex>Đã thêm '+e.newKeyWords.length+' từ khóa.</span></md-toast>',
                    position: 'bottom right',
                    hideDelay: 3000
                });
            });
            vm.newKeyWord ="";
        }
        function deleteKeywork(keywork){
            var confirm = $mdDialog.confirm()
                .title('Xác nhận xóa')
                .textContent('Bạn có chắc muốn xóa từ khóa '+keywork.name)
                .ok('Xóa')
                .cancel('Quay lại');

            $mdDialog.show(confirm).then(function() {
                apiService.getAPI(SERVER_DELETEKEYWORK + "?id=" + keywork.id, true, function (e) {
                    var isSuccess = e.success == 1;
                    if (!isSuccess) {
                        $mdDialog.show(
                            $mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title('Error')
                                .textContent('Không thể xóa từ khóa! vui lòng thử lại.')
                                .ok('OK!')
                        );
                        return;
                    }
                    $mdToast.show({
                        template: '<md-toast><span flex>Đã xóa từ khóa '+keywork.name+'.</span></md-toast>',
                        position: 'bottom right',
                        hideDelay: 3000
                    });
                    vm.keyWords.forEach(function(item, index){
                        if(item.id == keywork.id){
                            vm.keyWords.splice(index, 1);
                        }
                    });
                });
            }, function() {
            });
        }
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
                vm.selectedWebsite = vm.websites[0];
                getKeyworks(vm.selectedWebsite);
            });
        }
        function getKeyworks(website){
            apiService.getAPI(SERVER_GETKEYWORKLIST + "?id=" + website.id, true, function (e) {
                var isSuccess = e.success == 1;
                if (!isSuccess) {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Error')
                            .textContent('Không thể lấy dữ liệu! Vui lòng thử lại.')
                            .ok('OK!')
                    );
                    return;
                }
                vm.keyWords = e.keyworks;
                vm.orderBy = 'name';
            });
        }
        function goUrl(url){
            if (!/^https*:\/\//.test(url)) {
                url = "http://" + url;
            }
            window.open(url, '_blank');
        }
    }
})();