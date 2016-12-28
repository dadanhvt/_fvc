/**
 * Created by kinhcan on 10/10/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.main.profile')
        .controller('PhotosController', PhotosController);
    function PhotosController($mdDialog) {
        var vm = this;
        vm.openImage = openImage;
        vm.openVideo =openVideo;
        vm.FilterImage = FilterImage;
        vm.FilterVideo = FilterVideo;
        init()
        function init() {
            FilterImage();
        }
        vm.images =[
            {
                Type : "Image",
                Url : "app/main/profile/images/1.jpg",
                Name : "1.jpg"
            },
            {
                Type : "Image",
                Url : "app/main/profile/images/2.jpg"
            },
            {
                Type : "Image",
                Url : "app/main/profile/images/3.jpg"
            },
            {
                Type : "Image",
                Url : "app/main/profile/images/4.jpg"
            },
            {
                Type : "Image",
                Url : "app/main/profile/images/1.jpg"
            },
            {
                Type : "Image",
                Url : "app/main/profile/images/2.jpg"
            },
            {
                Type : "Video",
                Url : "app/main/profile/images/posterVideo.png"
            },
            {
                Type : "Video",
                Url : "app/main/profile/images/1.jpg"
            },
            {
                Type : "Video",
                Url : "app/main/profile/images/3.jpg"
            },
            {
                Type : "Video",
                Url : "app/main/profile/images/3.jpg"
            },
            {
                Type : "Image",
                Url : "app/main/profile/images/2.jpg"
            },
            {
                Type : "Video",
                Url : "app/main/profile/images/posterVideo.png"
            },
            {
                Type : "Video",
                Url : "app/main/profile/images/1.jpg"
            },
            {
                Type : "Video",
                Url : "app/main/profile/images/3.jpg"
            },
            {
                Type : "Video",
                Url : "app/main/profile/images/3.jpg"
            }
        ];

        vm.videos =[
            {
                Type : "Video",
                Url : "app/main/profile/images/V1.MP4",
                Poster :"app/main/profile/images/posterVideo.png"
            },
            {
                Type: "Video",
                Url: "app/main/profile/images/V2.MP4",
                Poster :"app/main/profile/images/posterVideo.png"
            },
            {
                Type : "Video",
                Url : "app/main/profile/images/V3.MP4",
                Poster :"app/main/profile/images/posterVideo.png"
            },
            {
                Type: "Video",
                Url: "app/main/profile/images/V4.MP4",
                Poster :"app/main/profile/images/posterVideo.png"
            },
            {
                Type : "Video",
                Url : "app/main/profile/images/V1.MP4",
                Poster :"app/main/profile/images/posterVideo.png"
            },
            {
                Type: "Video",
                Url: "app/main/profile/images/V2.MP4",
                Poster :"app/main/profile/images/posterVideo.png"
            }
        ];
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
