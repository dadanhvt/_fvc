/**
 * Created by Tinti on 9/27/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.main.ads')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider) {

        $stateProvider
            .state('phaojlar.menu.default.admin-config', {
                url: '/admin/config',
                templateUrl: 'app/main/admin/config/config.tmpl.html',
                controller: 'AdminConfigController',
                controllerAs: 'vm',
                resolve: {
                    access: ["Auth", function (Auth) {
                        return Auth.hasRole('AD');
                    }]
                }
            })
            .state('phaojlar.menu.default.admin-users', {
                url: '/admin/users',
                templateUrl: 'app/main/admin/users/users.tmpl.html',
                controller: 'AdminUsersController',
                controllerAs: 'vm',
                resolve: {
                    access: ["Auth", function (Auth) {
                        return Auth.hasRole('ADMIN');
                    }]
                }
            })

            .state('list-users', {
                url: '/admin/users/list',
                templateUrl: 'app/main/admin/users/users-list.tmpl.html',
                controller: 'UsersList',
                controllerAs: 'vm',
                resolve: {
                    access: ["Auth", function (Auth) {
                        return Auth.hasRole('AD');
                    }],
                    countries: function(apiService) {
                        return apiService.getAPI(SERVER_GETCOUNTRIES, false, function (e) {
                            var isSuccess = e.success == 1;
                            if (!isSuccess) {
                                return;
                            }
                            return e.result;
                        });
                    },
                    industries: function(apiService) {
                        return apiService.getAPI(SERVER_GETINDUSTRIES, false, function (e) {
                            var isSuccess = e.success == 1;
                            if (!isSuccess) {
                                return;
                            }
                            return e.result;
                        });
                    },
                    languages: function(apiService) {
                        return apiService.getAPI(SERVER_GETLANGUAGES, false, function (e) {
                            var isSuccess = e.success == 1;
                            if (!isSuccess) {
                                return;
                            }
                            return e.result;
                        });
                    }
                }
            })
    }
})();
