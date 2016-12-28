/**
 * Created by kinhcan on 10/10/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.main.profile')
        .controller('TimeLineController',TimeLineController);
    function TimeLineController($mdDialog, $mdToast) {
        var vm = this;
        vm.deletePost = deletePost;
        vm.editPost =editPost;
        vm.toggleLikePost =likePost;
        vm.deleteComment = deleteComment;
        vm.editComment = editComment;
        vm.Poststt = Poststt;
        vm.Postcmt =Postcmt;
        vm.editClick = editClick;
        vm.selectedFiles = selectedFiles;
        init();

        function init() {
            vm.testtext = "asd The titles of Washed Out's breakthrough song and the first single from Paracosm share the two The titles of Washed Out's breakthrough song and the first single from Paracosm share the twoThe titles of Washed Out's breakthrough song and the first single from Paracosm share the two"
            vm.limit=-2;
            vm.checkshow=true;
            vm.posts = [];
        }
        function selectedFiles() {
            console.log(vm.imagesUpload);
        }
        function editClick(post) {
            $mdDialog.show({
                controller: 'EditPostDialogController',
                controllerAs: 'vm',
                locals:{
                    post: post
                },
                templateUrl: 'app/main/profile/timeline/edit-post.tmpl.html'
            });
        }
        vm.posts = [
            {
                AvatarPost:"app/main/profile/images/1.jpg",
                UsernamePost :"kinhcan",
                TimePost :"9/1/2016",
                ContentPost :"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                likesCount : 10,
                isLiked: true,
                Comments :[
                    {
                        AvatarComment :"app/main/profile/images/1.jpg",
                        UsernameComment :"Riki",
                        TimeComment : "10/10/2016",
                        contentComment :"Washed Out's breakthrough song and the first single"
                    },
                    {
                        AvatarComment : "app/main/profile/images/avatar-1.png",
                        UsernameComment :"Event",
                        TimeComment : "10/10/2016",
                        contentComment :"Washed Out's breakthrough song and the first single"
                    },
                    {
                        AvatarComment : "app/main/profile/images/1.jpg",
                        UsernameComment :"kinhcan",
                        TimeComment : "10/10/2016",
                        contentComment :"Washed Out's breakthrough song and the first single"
                    }
                ]
            },
            {
                AvatarPost :"app/main/profile/images/2.jpg",
                UsernamePost :"kinhcan",
                TimePost : "10/8/2016",
                ContentPost :"The titles of Washed Out's breakthrough song and the first single from Paracosm share the two most important words in Ernest Greene's musical language: feel it. It's a simple request, as well...",
                likesCount : 1000,
                isLiked: false,
                Comments :[
                    {
                        AvatarComment : "app/main/profile/images/avatar-1.png",
                        UsernameComment :"kinhcan",
                        TimeComment : "10/10/2015",
                        contentComment :"Washed Out's breakthrough song and the first single"
                    },
                    {
                        AvatarComment : "app/main/profile/images/1.jpg",
                        UsernameComment :"Riki",
                        TimeComment : "10/10/2016",
                        contentComment :"Washed Out's breakthrough song and the first single"
                    },
                    {
                        AvatarComment : "app/main/profile/images/1.jpg",
                        UsernameComment :"Event",
                        TimeComment : "10/10/2016",
                        contentComment :"Washed Out's breakthrough song and the first single"
                    }
                ]
            }
        ];
        function editPost(post) {
            post.Editting = false;
        }
        function deletePost(post) {
            var confirm = $mdDialog.confirm()
                .title('Would you like to delete your post?')
                .cancel('Cancel')
                .ok('Delete');

            $mdDialog.show(confirm).then(function() {
                vm.posts.splice(vm.posts.indexOf(post), 1);
                $mdToast.show({
                    template: '<md-toast><span flex>Deleted</span></md-toast>',
                    position: 'bottom right',
                    hideDelay: 3000
                });
            }, function() {
                return;
            });
        }
        function likePost(post) {
            if(post.isLiked == false) {
                post.likesCount++;
                post.isLiked = true;
            }else{
                post.likesCount--;
                post.isLiked = false;
            }
        }
        function deleteComment(post,comment) {
            var confirm = $mdDialog.confirm()
                .title('Would you like to delete your post?')
                .textContent('Are you sure delete this post')
                .ok('Delete')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function() {
                post.Comments.splice(post.Comments.indexOf(comment), 1);
            }, function() {
                return;
            });
        }
        function editComment(comment) {
            comment.Editting = false;
        }
        function Poststt() {
            var time = new Date();
            if(vm.data)
            {
                var data = {
                    AvatarPost: "app/main/profile/images/1.jpg",
                    UsernamePost :"kinhcan",
                    TimePost : time,
                    ContentPost : vm.data,
                    likesCount : 0,
                    Comments :[]
                };
                vm.posts.unshift(data);
                vm.data ="";
            }

        }
        function Postcmt(comment,index) {
            var time = new Date();
            if(comment.cmt)
            {
                var cmt = {
                    AvatarComment : "app/main/profile/images/avatar-1.png",
                    UsernameComment :"kinhcan",
                    TimeComment : time,
                    contentComment : comment.cmt
                };
                if(!vm.checkshow) vm.limit++;
                else vm.limit--;
                vm.posts[index].Comments.unshift(cmt);
                comment.cmt='';
                $mdToast.show({
                    template: '<md-toast><span flex>Comment posted</span></md-toast>',
                    position: 'bottom right',
                    hideDelay: 3000
                });
            }
        }

    }
})();
