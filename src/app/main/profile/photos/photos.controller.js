/**
 * Created by kinhcan on 10/10/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.main.profile')
        .controller('PhotosController', PhotosController);
    function PhotosController($mdDialog, apiService, $rootScope) {
        var vm = this;
        vm.openImage = openImage;
        vm.openVideo =openVideo;
        vm.FilterImage = FilterImage;
        vm.FilterVideo = FilterVideo;
        init();
        function init() {
            vm.serverAssets = SERVER_ASSETS;
            apiService.getAPI(SERVER_GETPHOTOS  + "?id=" + $rootScope.profileUser, true, function (e) {
                if (!(e.success == 1)) {
                    $state.go('phaojlar.default.profile.photos',{userId: $rootScope.user.id});
                    return;
                }
                vm.images = e.result;
                for(var i=0;i<vm.images.length;i++){
                    if(vm.images[i].type == 'AVA'){
                        vm.images[i].url = vm.serverAssets+'upload/avatar/'+vm.images[i].name
                    }else if(vm.images[i].type == 'POST'){
                        vm.images[i].url = vm.serverAssets+'upload/post/'+vm.images[i].name
                    }
                }
            });
        }
        //FILTER//
        function FilterImage() {
            vm.Enable = true;
        }
        function FilterVideo() {
            vm.Enable = false;
        }

        //OPEN//
        function openImage(index) {
            $mdDialog.show({
                controller: 'OpenImageController',
                controllerAs: 'vm',
                templateUrl: 'app/main/profile/photos/open-image.tmpl.html',
                clickOutsideToClose: true,
                focusOnOpen: false,
                locals: {
                    index: index,
                    images: vm.images
                }
            });
        }
        function openVideo(index) {
            $mdDialog.show({
                controller: 'OpenVideoController',
                controllerAs: 'vm',
                templateUrl: 'app/main/profile/photos/open-video.tmpl.html',
                clickOutsideToClose: true,
                focusOnOpen: false,
                locals: {
                    index: index,
                    videos: vm.videos
                }
            });
        }
    }
})();
