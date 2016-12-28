/**
 * Created by Tinti on 9/23/2016.
 */
(function () {
    'use strict';

    angular
        .module('phaojlar')
        .factory('Auth', Auth);

    Auth.$inject = ['$q', 'userService'];
    /** @ngInject **/
    function Auth($q, userService) {
        var Access = {

            OK: 200,
            UNAUTHORIZED: 401,
            FORBIDDEN: 403,

            hasRole: function(role) {
                var deferred = $q.defer();
                userService.updateUser().then(function(userProfile) {
                    if (userProfile.hasRole(role)) {
                        deferred.resolve(Access.OK);
                    } else if (userProfile.isAnonymous()) {
                        deferred.reject(Access.UNAUTHORIZED);
                    } else {
                        deferred.reject(Access.FORBIDDEN);
                    }
                });
                return deferred.promise;
            },

            isAnonymous: function() {
                var deferred = $q.defer();
                userService.updateUser().then(function(userProfile) {
                    if (userProfile.isAnonymous()) {
                        deferred.resolve(Access.OK);
                    } else {
                        deferred.reject(Access.FORBIDDEN);
                    }
                });
                return deferred.promise;
            },

            isAuthenticated: function() {
                var deferred = $q.defer();
                userService.updateUser().then(function(userProfile) {
                    if (userProfile.isAuthenticated()) {
                        deferred.resolve(Access.OK);
                    } else {
                        deferred.reject(Access.UNAUTHORIZED);
                    }
                });
                return deferred.promise;
            }

        };

        return Access;
    }

})();