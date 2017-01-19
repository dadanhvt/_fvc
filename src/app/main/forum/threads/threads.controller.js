(function() {
    'use strict';

    angular
        .module('app.main.forum')
        .controller('ForumThreadsController', ForumThreadsController);

    /* @ngInject */
    function ForumThreadsController($stateParams,apiService,$mdDialog,$rootScope,$state) {
        var vm = this;

        vm.hello = 'Xin Chào ! Nếu đây là chuyến thăm đầu tiên của bạn vào Diễn đàn , hãy chắc chắn kiểm tra quy cách ' +
            'bằng cách nhấn vào liên kết ở dưới . Bạn phải đăng ký trước khi bạn có thể đăng bài : nhấp vào liên kết ' +
            'đăng ký ở trên để tiến hành . Để bắt đầu xem bài viết , chọn diễn đàn mà bạn muốn ghé thăm từ sự chọn lựa bên dưới.';

        vm.getData = getData;
        vm.addNewPost= addNewPost;
        vm.categories={};

        init();
        function init() {
            vm.query = {
                limit: 25,
                page: 1
            };
            vm.aliasCategory = $stateParams.alias;

            apiService.getAPI(SERVER_GETCATEGORIESBYALIAS+"?alias="+ vm.aliasCategory+"&limit="+ vm.query.limit, true, function (e) {
                if (e.success != 1) {
                    $state.go("phaojlar.default.forum.posts");
                }
                else
                {
                    vm.categories = e.result;
                    vm.posts = e.result.posts;
                    vm.bracum =[];
                    var tmp = findItembyAlias($rootScope.categories, vm.aliasCategory);
                    vm.bracum.push(tmp);
                    while (tmp.parent_id)
                    {
                        tmp = findItem($rootScope.categories,tmp.parent_id);
                        vm.bracum.unshift(tmp);
                    }
                    $rootScope.bracum = vm.bracum;
                }
            });
        }
        vm.query.page = $stateParams.page?parseInt($stateParams.page):1;
        function getData() {
            apiService.getAPI(SERVER_GETPOSTSPAGINATE + "?limit=" + vm.query.limit+"&alias="+vm.aliasCategory + "&page=" + vm.query.page, false, function (e) {
                if (!(e.success == 1)) {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Error')
                            .textContent('Cannot load data! please try again.')
                            .ok('OK!')
                    );
                    return;
                }
                vm.posts = e.result;
            });
        }
        function addNewPost() {
            $mdDialog.show({
                controller: 'AddPostController',
                templateUrl: 'app/main/forum/threads/addpost.tmpl.html',
                controllerAs: 'vm',
                escapeToClose: false,
                locals: {
                    alias: vm.aliasCategory
                }
            }).then(function (id) {
                $state.go("phaojlar.default.forum.posts",{alias:vm.aliasCategory, idPost:id, page:1});
            });

        }
    }

})();
/**
 * Created by Tri NH on 10/14/2016.
 */
