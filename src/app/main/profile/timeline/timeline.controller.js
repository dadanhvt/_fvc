/**
 * Created by kinhcan on 10/10/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.main.profile')
        .controller('TimeLineController', TimeLineController);
    function TimeLineController($rootScope, $http, $mdDialog, $mdToast, apiService) {
        var vm = this;
        vm.deleteClick = deleteClick;
        vm.toggleLikePost = likePost;
        vm.Poststt = Poststt;
        vm.Postcmt = Postcmt;
        vm.editClick = editClick;
        vm.deleterImage = deleterImage;
        vm.openImage = openImage;
        vm.getMoreCmt = getMoreCmt;
        vm.getMorePosts = getMorePosts;
        init();

        function init() {
            vm.cmtlimit =5;
            vm.query = {
                limit: 15,
                page: 1
            };
            vm.postContent = '';
            vm.serverAssets = SERVER_ASSETS;
            apiService.getAPI(SERVER_GETPOSTS + "?id=" + $rootScope.profileUser + "&cmtlimit="+ vm.cmtlimit + "&limit="+ vm.query.limit+"&page="+vm.query.page, true, function (e) {
                if (!(e.success == 1)) {
                    $state.go('phaojlar.default.profile.timeline', {userId: $rootScope.user.id});
                    return;
                }
                vm.posts = e.result;
            });
        }
        function getMorePosts() {
            vm.query.page = vm.query.page+1;
            apiService.getAPI(SERVER_GETPOSTS + "?id=" + $rootScope.profileUser + "&cmtlimit="+ vm.cmtlimit + "&limit="+ vm.query.limit+"&page="+vm.query.page, true, function (e) {
                if (!(e.success == 1)) {
                    return;
                }
                vm.posts.data = vm.posts.data.concat(e.result.data);
            });
        }
        function getMoreCmt(post) {
            post.comments.current_page = post.comments.current_page+1;
            apiService.getAPI(SERVER_GETMORECOMMENTSPOST + "?id=" + post.id + "&cmtlimit="+ vm.cmtlimit+ "&page="+ post.comments.current_page, true, function (e) {
                if (!(e.success == 1)) {
                    return;
                }
                post.comments.data = e.result.data.concat(post.comments.data);
            });
        }
        function openImage(images, index) {
            var tmp_images = [];
            for (var i = 0; i < images.length; i++) {
                tmp_images.push({url: vm.serverAssets + 'upload/post/' + images[i].name});
            }
            $mdDialog.show({
                controller: 'OpenImageController',
                controllerAs: 'vm',
                templateUrl: 'app/main/profile/photos/open-image.tmpl.html',
                clickOutsideToClose: true,
                focusOnOpen: false,
                locals: {
                    index: index,
                    images: tmp_images
                }
            });
        }

        function deleterImage(index) {
            vm.imagesUpload.splice(index, 1);
        }

        function editClick(post) {
            $mdDialog.show({
                controller: 'EditPostDialogController',
                controllerAs: 'vm',
                locals: {
                    post: post
                },
                templateUrl: 'app/main/profile/timeline/edit-post.tmpl.html'
            });
        }

        function deleteClick(posts, index) {
            var confirm = $mdDialog.confirm()
                .title('Would you like to delete your post?')
                .cancel('Cancel')
                .ok('Delete');

            $mdDialog.show(confirm).then(function () {
                var param = {
                    id: posts.data[index].id
                };
                apiService.postAPI(SERVER_DELETEPOST, true, param, function (e) {
                    if (e.success != 1) {
                        $mdToast.show({
                            template: '<md-toast><span flex>Cann\'t delete, please try again!</span></md-toast>',
                            position: 'bottom right',
                            hideDelay: 3000
                        });
                        return;
                    }
                    $mdToast.show({
                        template: '<md-toast><span flex>Deleted</span></md-toast>',
                        position: 'bottom right',
                        hideDelay: 3000
                    });
                    posts.total = posts.total - 1;
                    posts.data.splice(index, 1);
                });
            }, function () {
                return;
            });
        }

        function likePost(post) {
            var param = {
                id: post.id
            };
            apiService.postAPI(SERVER_CHANGELIKE, false, param, function (e) {
                if (e.success != 1) {
                    $mdToast.show({
                        template: '<md-toast><span flex>Cann\'t change like, please try again!</span></md-toast>',
                        position: 'bottom right',
                        hideDelay: 3000
                    });
                    return;
                }
                if (e.result == '0') {
                    post.is_liked = [];
                    post.like_count[0].count = post.like_count[0].count - 1;
                } else if (e.result == '1') {
                    post.is_liked.push($rootScope.user);
                    if (post.like_count.length > 0) {
                        post.like_count[0].count = post.like_count[0].count + 1;
                    } else {
                        post.like_count.push({count: 1});
                    }
                }
            });
        }

        function Poststt() {
            if (vm.postContent != '' || vm.imagesUpload.length > 0) {
                var fd = new FormData();
                console.log(vm.imagesUpload);
                if(vm.imagesUpload!=undefined){
                    for (var x = 0; x < vm.imagesUpload.length; x++) {
                        fd.append("files[]", vm.imagesUpload[x]);
                    }
                }
                fd.append('contents', vm.postContent);
                $rootScope.countLoader = $rootScope.countLoader + 1;if($rootScope.countLoader == 1)$rootScope.isShowPageLoader = true;
                $http.post(SERVER_ADDNEWPOST, fd, {
                    transformRequest: angular.identity,
                    withCredentials: true,
                    headers: {'Content-Type': undefined}
                })
                    .success(function (e) {
                        $mdToast.show({
                            template: '<md-toast><span flex>Posted</span></md-toast>',
                            position: 'bottom right',
                            hideDelay: 3000
                        });
                        vm.imagesUpload = [];
                        vm.postContent = '';
                        $rootScope.countLoader = $rootScope.countLoader - 1;if($rootScope.countLoader == 0)$rootScope.isShowPageLoader = false;
                        vm.posts.unshift(e.result);
                    })

                    .error(function () {
                        $mdToast.show({
                            template: '<md-toast><span flex>Error! Please try again.</span></md-toast>',
                            position: 'bottom right',
                            hideDelay: 3000
                        });
                        $rootScope.countLoader = $rootScope.countLoader - 1;if($rootScope.countLoader == 0)$rootScope.isShowPageLoader = false;
                    });
            }
        }

        function Postcmt(post) {
            if (post.newCmt && post.newCmt != '') {
                var param = {
                    id: post.id,
                    contents: post.newCmt
                };
                apiService.postAPI(SERVER_ADDNEWCOMMENT, true, param, function (e) {
                    if (e.success != 1) {
                        $mdToast.show({
                            template: '<md-toast><span flex>Cann\'t comment, please try again!</span></md-toast>',
                            position: 'bottom right',
                            hideDelay: 3000
                        });
                        return;
                    }
                    post.comments.data.push(e.result);
                    post.newCmt = '';
                });
            }
        }

    }
})();
