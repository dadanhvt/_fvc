/**
 * Created by Tinti on 9/26/2016.
 */
(function() {
    'use strict';

    angular
        .module('phaojlar.components')
        .controller('SpiderSlideController', SpiderSlideController);

    /* @ngInject */
    function SpiderSlideController($mdDialog, $rootScope) {
        var vm = this;
        vm.rankingtrailer = rankingtrailer;
        vm.keyWorks = [];
        init();
        function init() {
        }
        function rankingtrailer(){
            vm.keyWorks = vm.ranking.keyWords.split("\n");
            if (vm.keyWorks.length > $rootScope.config.guest_keywork_ranking){
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Lỗi')
                        .textContent('Bạn chỉ được dùng thử tối đa '+$rootScope.config.guest_keywork_ranking+' từ khóa.')
                        .ok('OK!')
                );
                return;
            }
            $mdDialog.show({
                controller: 'RankingDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/phaojlar/components/slides/ranking-dialog.tmpl.html',
                locals: {
                    keyworks: vm.keyWorks,
                    website: vm.ranking.website
                }
            });
            vm.ranking.keyWords = "";
            vm.ranking.website = "";
        }
    }
})();
