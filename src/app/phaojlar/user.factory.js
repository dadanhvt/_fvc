/**
 * Created by Tinti on 9/23/2016.
 */
/**
 * Created by Tinti on 9/23/2016.
 */
(function () {
    'use strict';

    angular
        .module('phaojlar')
        .factory('User', User);

    User.$inject = ['$resource'];
    /** @ngInject **/
    function User($resource) {
        return {
            updateProfile: function(){
                return $resource(SERVER_GETUSER, {}, {
                    profile: {
                        method: "GET"
                    }
                });
            }
        };
    }
})();