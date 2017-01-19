/**
 * Created by kinhcan on 10/10/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.main.profile')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {

        $stateProvider
            .state('phaojlar.default.profile', {
                url: '/profile/:userId',
                templateUrl: 'app/main/profile/layouts/profile.tmpl.html',
                controller: 'ProfileController',
                controllerAs: 'vm'
            })
            .state('phaojlar.default.profile.about', {
                url: '/about',
                templateUrl: 'app/main/profile/about/about.tmpl.html',
                controller: 'AboutController',
                controllerAs: 'vm'
            })
            .state('phaojlar.default.profile.timeline', {
                url: '/timeline',
                templateUrl: 'app/main/profile/timeline/timeline.tmpl.html',
                controller: 'TimeLineController',
                controllerAs: 'vm'

            })
            .state('phaojlar.default.profile.photos', {
                url: '/photos',
                templateUrl: 'app/main/profile/photos/photos.tmpl.html',
                controller: 'PhotosController',
                controllerAs: 'vm'
            })
            .state('phaojlar.default.profile.jobs', {
                url: '/jobs',
                templateUrl: 'app/main/profile/jobs/jobs.tmpl.html',
                controller: 'JobsController',
                controllerAs: 'vm'
            })
            .state('phaojlar.default.profile.connection', {
                url: '/connection',
                templateUrl: 'app/main/profile/connection/connection.tmpl.html',
                controller: 'ConnectionController',
                controllerAs: 'vm'

            })

    }
})();
