/**
 * Created by Tinti on 9/23/2016.
 */
(function () {
    'use strict';
    angular
        .module('phaojlar')
        .factory('userService', userService);

    userService.$inject = ['$q', 'User'];
    /** @ngInject **/
    function userService($q, User) {
        return {
            updateUser: function(){
                var deferred = $q.defer();
                User.updateProfile().profile(function (userProfile) {
                    deferred.resolve({

                        user: userProfile,

                        hasRole: function (role) {
                            if(userProfile.user){
                                if(role=='AD'){
                                    return getRole(userProfile.user.role) == 'AD';
                                }else if(role=='HH'){
                                    return getRole(userProfile.user.role) == 'HH';
                                }else if(role=='RE'){
                                    return getRole(userProfile.user.role) == 'RE';
                                }else if(role=='JP'){
                                    return getRole(userProfile.user.role) == 'JP';
                                }else if(role=='US'){
                                    return getRole(userProfile.user.role) == 'US';
                                }else if(role=='BA'){
                                    return getRole(userProfile.user.role) == 'BA';
                                }else{
                                    return userProfile.user.role == role;
                                }
                            }
                            return false;
                        },

                        isAnonymous: function () {
                            return userProfile.success == 0;
                        },

                        isAuthenticated: function () {
                            return userProfile.success == 1;
                        }

                    });
                });
                return deferred.promise;
            }
        };
    }
})();
