(function () {
    'use strict';

    angular
        .module('app.main.forum')
        .controller('ForumPostController', ForumPostController);

    /* @ngInject */

    function ForumPostController($state,$window,apiService,$stateParams,$mdToast,$rootScope) {
        var vm = this;

        vm.hello = 'Xin Chào ! Nếu đây là chuyến thăm đầu tiên của bạn vào Diễn đàn , hãy chắc chắn kiểm tra quy cách ' +
            'bằng cách nhấn vào liên kết ở dưới . Bạn phải đăng ký trước khi bạn có thể đăng bài : nhấp vào liên kết ' +
            'đăng ký ở trên để tiến hành . Để bắt đầu xem bài viết , chọn diễn đàn mà bạn muốn ghé thăm từ sự chọn lựa bên dưới.';

        vm.likePost =likePost;
        vm.likeComment = likeComment;
        vm.getComments = getComments;
        vm.addComment =addComment;
        vm.clickQuote = clickQuote;

        init();
        function init() {
            vm.server = SERVER_ASSETS;
            vm.aliasCategory = $stateParams.alias;
            vm.idPost = $stateParams.idPost;
            vm.commentContent ='';
            vm.query = {
                limit: 15,
                page: 1
            };
            apiService.getAPI(SERVER_GETFORUMPOST + "?alias=" + vm.aliasCategory + "&id=" + vm.idPost+"&limit=5", true, function (e) {
                if (!(e.success == 1)) {
                    $state.go("phaojlar.default.forum.index");
                }else{
                    vm.post= e.result;
                    vm.bracum =[];
                    var tmp = findItembyAlias($rootScope.categories, vm.aliasCategory);
                    vm.bracum.push(tmp);
                    while (tmp.parent_id)
                    {
                        tmp = findItem($rootScope.categories,tmp.parent_id);
                        vm.bracum.unshift(tmp);
                    }
                    $rootScope.bracum = vm.bracum;

                    vm.query.page = $stateParams.page?parseInt($stateParams.page):1;
                    getComments();
                }
            });
        }

        function clickQuote(post) {
            if (vm.commentContent == null)vm.commentContent="";
            vm.commentContent = vm.commentContent + "<blockquote><p>"+post.author.name+" said: </p><br>"+post.contents+"</blockquote>";
        }

        function likePost() {
            var param = {id: vm.post.id};

            apiService.postAPI(SERVER_POSTLIKEFORUMPOST, false, param, function (e) {
                if (e.success != 1) {
                    $mdToast.show({
                        template: '<md-toast><span flex>Cann\'t change like, please try again!</span></md-toast>',
                        position: 'bottom right',
                        hideDelay: 3000
                    });
                    return;
                }
                if (e.result == '0') {
                    vm.post.is_liked = false;
                    vm.post.like_count=  vm.post.like_count - 1;
                } else if (e.result == '1') {
                    vm.post.is_liked=true;
                    vm.post.like_count =  vm.post.like_count + 1;
                }
            });
        }
        function likeComment(comment) {
            var param = {id: comment.id};

            apiService.postAPI(SERVER_POSTLIKEFORUMPOST, false, param, function (e) {
                if (e.success != 1) {
                    $mdToast.show({
                        template: '<md-toast><span flex>Cann\'t change like, please try again!</span></md-toast>',
                        position: 'bottom right',
                        hideDelay: 3000
                    });
                    return;
                }
                if (e.result == '0') {
                    comment.is_liked = [];
                    comment.like_count[0].count = comment.like_count[0].count - 1;
                } else if (e.result == '1') {
                    comment.is_liked.push($rootScope.user);
                    if (comment.like_count.length > 0) {
                        comment.like_count[0].count = comment.like_count[0].count + 1;
                    } else {
                        comment.like_count.push({count: 1});
                    }
                }
            });

        }
        function getComments() {
            apiService.getAPI(SERVER_GETFORUMCOMMENTS +"?id="+ vm.idPost+"&limit="+vm.query.limit+"&page="+vm.query.page, true, function (e) {
                if (!(e.success == 1)) {
                    $state.go("phaojlar.default.forum.index");
                }
                vm.comments= e.result;
            });
        }

        function addComment() {
            if (vm.commentContent && vm.commentContent != '') {
                var param = {
                    id: vm.post.id,
                    contents: vm.commentContent,
                    limit : vm.query.limit
                };
                apiService.postAPI(SERVER_POSTADDFORUMCOMMENT, true, param, function (e) {
                    if (e.success != 1) {
                        $mdToast.show({
                            template: '<md-toast><span flex>Cann\'t comments, please try again!</span></md-toast>',
                            position: 'bottom right',
                            hideDelay: 3000
                        });
                        return;
                    }
                    if(vm.query.page != e.result){
                        $state.go("phaojlar.default.forum.posts",{alias:vm.aliasCategory, idPost:vm.idPost, page:e.result});
                    }else{
                        $window.location.reload();
                    }
                });
            }
        }
    }
})();

/**
 * Created by Tri NH on 10/17/2016.
 */
