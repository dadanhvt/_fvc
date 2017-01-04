(function () {
    'use strict';

    angular
        .module('app.main.forum')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider) {

        $stateProvider
            .state('phaojlar.default.forum', {
                url: '/discussions',
                templateUrl: 'app/main/forum/layouts/forum.tmpl.html',
                controller: 'ForumLayoutController',
                controllerAs: 'vm'
            })
            .state('phaojlar.default.forum.index', {
                url: '/index',
                templateUrl: 'app/main/forum/index/index.tmpl.html',
                controller: 'ForumIndexController',
                controllerAs: 'am'
            })
            .state('phaojlar.default.forum.threads', {
                url: '/thread',
                templateUrl: 'app/main/forum/threads/threads.tmpl.html',
                controller: 'ForumThreadsController',
                controllerAs: 'cm'
            })
            .state('phaojlar.default.forum.posts', {
                url: '/post',
                templateUrl: 'app/main/forum/posts/posts.tmpl.html',
                controller: 'ForumPostController',
                controllerAs: 'zm'
            })
    }
})();
