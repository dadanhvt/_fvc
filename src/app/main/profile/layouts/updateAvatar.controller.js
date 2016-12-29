/**
 * Created by kinhcan on 10/10/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.main.profile')
        .controller('UpdateAvatarController', UpdateAvatarController);
    function UpdateAvatarController($http, $mdToast, $mdDialog){
        var vm = this;
        vm.uploadCV = uploadCV;
        vm.save = save;
        function save(file) {
            console.log(vm.picFile);
        }
        function uploadCV() {
            if(file !=null){
                var fd = new FormData();
                fd.append('file', vm.picFile);
                $rootScope.countLoader = $rootScope.countLoader + 1;if($rootScope.countLoader == 1)$rootScope.isShowPageLoader = true;
                $http.post(SERVER_EDITAVATAR, fd, {
                    transformRequest: angular.identity,
                    withCredentials: true,
                    headers: {'Content-Type': undefined}
                })
                    .success(function (e) {
                        $rootScope.countLoader = $rootScope.countLoader - 1;if($rootScope.countLoader == 0)$rootScope.isShowPageLoader = false;
                        $mdToast.show({
                            template: '<md-toast><span flex>Upload success!</span></md-toast>',
                            position: 'bottom right',
                            hideDelay: 3000
                        });
                        $mdDialog.hide(e.result);
                    })

                    .error(function () {$rootScope.countLoader = $rootScope.countLoader - 1;if($rootScope.countLoader == 0)$rootScope.isShowPageLoader = false;
                        $mdToast.show({
                            template: '<md-toast><span flex>Error! Please try again.</span></md-toast>',
                            position: 'bottom right',
                            hideDelay: 3000
                        });
                    });
            }

        }
    }
})();

