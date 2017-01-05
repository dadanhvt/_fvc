(function () {
    'use strict';

    angular
        .module('app.main.forum')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider) {

        $stateProvider
            .state('phaojlar.default.forum', {
                // url: '/discussions',
                templateUrl: 'app/main/forum/layouts/forum.tmpl.html',
                controller: 'ForumLayoutController',
                controllerAs: 'vm',
                resolve: {
                    categories : function(apiService) {
                        return apiService.getAPI(SERVER_GETCATEGORIES, true, function (e) {
                            var isSuccess = e.success == 1;
                            if (!isSuccess) {
                                return;
                            }
                            return e.result;
                        });
                    }
                }
            })
            .state('phaojlar.default.forum.index', {
                url: '/discussions',
                templateUrl: 'app/main/forum/index/index.tmpl.html',
                controller: 'ForumIndexController',
                controllerAs: 'vm'
            })
            .state('phaojlar.default.forum.threads', {
                url: '/discussions/:alias?page',
                templateUrl: 'app/main/forum/threads/threads.tmpl.html',
                controller: 'ForumThreadsController',
                controllerAs: 'vm'
            })
            .state('phaojlar.default.forum.posts', {
                url: '/discussions/:alias/:idPost?page',
                templateUrl: 'app/main/forum/posts/posts.tmpl.html',
                controller: 'ForumPostController',
                controllerAs: 'vm'
            })
    }
})();
