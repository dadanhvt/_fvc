/**
 * Created by kinhcan on 10/10/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.main.profile')
        .controller('OpenImageController', OpenImageController);
    function OpenImageController($mdDialog, index, images, $location, $anchorScroll) {
        var vm = this;
        vm.closeImg = closeImg;
        vm.changeImage = changeImage;
        vm.changeImageLeft =changeImageLeft;
        vm.changeImageRight =changeImageRight;
        init();
        function init() {
            vm.images = images;
            vm.curId = index;
            vm.curImg = vm.images[vm.curId];
            $location.hash('image-id-'+vm.curId);
            $anchorScroll();
        }
        function changeImage(index) {
            vm.curId = index;
            vm.curImg = vm.images[vm.curId];
            changeAnchorScroll();
        }
        function changeAnchorScroll() {
            $location.hash('image-id-'+vm.curId);
            $anchorScroll();
        }
        function changeImageLeft() {
            if (vm.curId ==  0) {
                vm.curId = vm.images.length-1;
            } else {
                vm.curId = vm.curId - 1;
            }
            vm.curImg = vm.images[vm.curId];
            changeAnchorScroll();
        }
        function changeImageRight() {
            if (vm.curId == vm.images.length - 1) {
                vm.curId = 0;
            } else {
                vm.curId = vm.curId + 1;
            }
            vm.curImg = vm.images[vm.curId];
            changeAnchorScroll();
        }
        function closeImg() {
            $mdDialog.cancel();
        }
    }
})();
