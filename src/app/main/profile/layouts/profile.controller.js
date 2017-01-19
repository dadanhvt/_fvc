/**
 * Created by kinhcan on 10/10/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.main.profile')
        .controller('ProfileController', ProfileController);
    function ProfileController($state,$mdDialog, $stateParams, $rootScope, apiService){
        var vm = this;
        vm.UpdateAvatar=UpdateAvatar;
        vm.goAbout=goAbout;
        vm.goTimeline=goTimeline;
        vm.goPhotos=goPhotos;
        vm.goJobs = goJobs;
        vm.goConnection=goConnection;
        vm.getAvatar = getAvatar;

        init();
        function init() {
            vm.server_assets = SERVER_ASSETS;
            if(!$stateParams.userId || $stateParams.userId == ''){
                $state.go('phaojlar.default.profile.about',{userId: $rootScope.user.id});
                return;
            }
            $rootScope.profileUser = $stateParams.userId;
            //api get basic profile
            //
            apiService.getAPI(SERVER_GETBASICPROFILE  + "?id=" + $rootScope.profileUser, true, function (e) {
                if (!(e.success == 1)) {
                    $state.go('phaojlar.default.profile.about',{userId: $rootScope.user.id});
                    return;
                }
                $rootScope.currentUser = e.result;
                console.log(e.result);
                console.log($rootScope);
                $rootScope.currentUser.role1=getRole($rootScope.currentUser.role);
                $rootScope.currentUser.avatar = getAvatar($rootScope.currentUser.avatar);
            });

            if ($state.current.name == 'phaojlar.default.profile') {
                vm.currentNavItem = 0;
            }
            else if ($state.current.name == 'phaojlar.default.profile.timeline') {
                vm.currentNavItem = 1;
            }
            else if ($state.current.name == 'phaojlar.default.profile.photos') {
                vm.currentNavItem = 2;
            }
            else if ($state.current.name == 'phaojlar.default.profile.jobs') {
                vm.currentNavItem = 2;
            }
            else if ($state.current.name == 'phaojlar.default.profile.connection') {
                vm.currentNavItem = 3;
            }
            else vm.currentNavItem = 0;
            vm.chartData = [40, 60];
            vm.chartLabels = ["Complete", "Uncomplete"];
            vm.chartColor = ['#DC3522','#002f2f'];
        }

        function goAbout() {
            $state.go('phaojlar.default.profile.about',{userId: $rootScope.profileUser});
        }
        function goTimeline() {
            $state.go('phaojlar.default.profile.timeline');
        }
        function goPhotos() {
            $state.go('phaojlar.default.profile.photos');
        }
        function goJobs() {
            $state.go('phaojlar.default.profile.jobs');
        }
        function goConnection() {
            $state.go('phaojlar.default.profile.connection');
        }
        function UpdateAvatar() {
            $mdDialog.show({
                controller: 'UpdateAvatarController',
                controllerAs: 'vm',
                templateUrl: 'app/main/profile/layouts/updateAvatar.tmpl.html',
                clickOutsideToClose: true,
                focusOnOpen: false
            }).then(function(new_url){
                $rootScope.user.avatar = getAvatar(new_url);
                $rootScope.currentUser.avatar = getAvatar(new_url);
            });
        }

    }
})();
