/**
 * Created by Tinti on 9/27/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.main.web-analyst')
        .controller('WebsiteRankingController', WebsiteRankingController);

    /* @ngInject */
    function WebsiteRankingController($scope, apiService, $mdToast, $filter, $state, $mdDialog, $stateParams) {
        var vm = this;
        vm.changeWebsite = changeWebsite;
        vm.overview = [];
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
                if(!$stateParams.website){
                    vm.selectedWebsite = vm.websites[0];
                    $state.go($state.current.name, {website: vm.selectedWebsite.website.url});
                }else {
                    for(var i=0;i<vm.websites.length;i++){
                        if(vm.websites[i].website.url == $stateParams.website){
                            vm.selectedWebsite = vm.websites[i];
                        }
                    }
                }
            }).then(function(){
                getWebsiteRanking();
            });
        }
        function changeWebsite(selectedWebsite){
            $state.go($state.current.name, {website: selectedWebsite.website.url});
        }
        function getWebsiteRanking(){
            if($stateParams.website != undefined){
                apiService.getAPI(SERVER_GETWEBSITERANKING + "?website=" + $stateParams.website, true, function (e) {
                    var isSuccess = e.success == 1;
                    if (!isSuccess) {
                        $mdDialog.show(
                            $mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title('Error')
                                .textContent('Cannot get website overview! please try again.')
                                .ok('OK!')
                        );
                        return;
                    }
                    vm.overview = e.result;
                    fetchData();
                });
            }
        }

        function fetchData(){
            vm.global = 0;
            if(vm.overview.ranking.global.rank != 'N/A'){
                var globalnum = Math.ceil(parseInt(vm.overview.ranking.global.rank)/100);
                var global = setInterval(function() {
                    if(parseInt(vm.overview.ranking.global.rank)<vm.global+globalnum){
                        vm.global = parseInt(vm.overview.ranking.global.rank);
                        clearInterval(global);
                    }else{
                        vm.global = vm.global + globalnum;
                    }
                    $scope.$apply();
                }, 20);
            }
            vm.country = 0;
            if(vm.overview.ranking.country.rank != 'N/A'){
                var countrynum = Math.ceil(parseInt(vm.overview.ranking.country.rank)/100);
                var country = setInterval(function() {
                    if(parseInt(vm.overview.ranking.country.rank)<vm.country+countrynum){
                        vm.country = parseInt(vm.overview.ranking.country.rank);
                        clearInterval(country);
                    }else{
                        vm.country = vm.country + countrynum;
                    }
                    $scope.$apply();
                }, 20);
            }
            vm.category = 0;
            if(vm.overview.ranking.category.rank != 'N/A'){
                var categorynum = Math.ceil(parseInt(vm.overview.ranking.category.rank)/100);
                var category = setInterval(function() {
                    if(parseInt(vm.overview.ranking.category.rank)<vm.category+categorynum){
                        vm.category = parseInt(vm.overview.ranking.category.rank);
                        clearInterval(category);
                    }else{
                        vm.category = vm.category + categorynum;
                    }
                    $scope.$apply();
                }, 20);
            }
            vm.geoChartData = {
                type: 'GeoChart',
                data: []
            };
            vm.geoChartData.data.push(['Country', 'Share']);
            angular.forEach(vm.overview.traffic.country, function(value, key){
                vm.geoChartData.data.push([value.name, value.traffic]);
            });
        }
    }
})();