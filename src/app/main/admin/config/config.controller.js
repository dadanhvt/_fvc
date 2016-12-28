(function() {
    'use strict';

    angular
        .module('app.main.admin')
        .controller('AdminConfigController', AdminConfigController);

    /* @ngInject */
    function AdminConfigController($window, $mdDialog, apiService, $mdToast, $rootScope) {
        var vm = this;
        vm.saveConfig = saveConfig;
        init();
        function init(){
            apiService.getAPI(SERVER_GETCONFIG,true, function(e){
                var isSuccess = e.success == 1;
                if(!isSuccess){
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Error')
                            .textContent('Cannot load Config! please try again.')
                            .ok('OK!')
                    );
                    return;
                }
                var atemp = {
                    upgrade_vip: parseInt(e.config.upgrade_vip),
                    upgrade_pentium: parseInt(e.config.upgrade_pentium),
                    fb_min_budget: parseInt(e.config.fb_min_budget),
                    gg_min_budget: parseInt(e.config.gg_min_budget),
                    guest_keywork_ranking: parseInt(e.config.guest_keywork_ranking),
                    basic_keywork_ranking: parseInt(e.config.basic_keywork_ranking),
                    vip_keywork_ranking: parseInt(e.config.vip_keywork_ranking),
                    pentium_keywork_ranking: parseInt(e.config.pentium_keywork_ranking)
                };
                vm.config = atemp;
            });
        }
        function saveConfig(){
            apiService.postAPI(SERVER_UPDATECONFIG,true, vm.config, function(e){
                var isSuccess = e.success == 1;
                if(!isSuccess){
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Error')
                            .textContent('Cannot update config admin.')
                            .ok('OK!')
                    );
                    return;
                }
                $mdToast.show({
                    template: '<md-toast><span flex>Đã lưu cấu hình.</span></md-toast>',
                    position: 'bottom right',
                    hideDelay: 3000
                });
                var atemp = {
                    upgrade_vip: parseInt(e.config.upgrade_vip),
                    upgrade_pentium: parseInt(e.config.upgrade_pentium),
                    fb_min_budget: parseInt(e.config.fb_min_budget),
                    gg_min_budget: parseInt(e.config.gg_min_budget),
                    guest_keywork_ranking: parseInt(e.config.guest_keywork_ranking),
                    basic_keywork_ranking: parseInt(e.config.basic_keywork_ranking),
                    vip_keywork_ranking: parseInt(e.config.vip_keywork_ranking),
                    pentium_keywork_ranking: parseInt(e.config.pentium_keywork_ranking)
                };
                vm.config = atemp;
                $rootScope.config = e.config;
            });
        }
    }
})();
