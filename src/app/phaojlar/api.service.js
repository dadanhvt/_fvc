/**
 * Created by Tinti on 7/20/2016.
 */
(function () {
    'use strict';

    angular
        .module('phaojlar')
        .service('apiService', apiService);

    apiService.$inject = ['$http', '$q', '$rootScope', '$state', '$mdToast'];
    /** @ngInject **/
    function apiService($http, $q, $rootScope, $state, $mdToast) {

        /**
         * Get API
         *
         * @param url
         * @param cbSuccess
         * @param cbError
         * @returns {Promise}
         */
        this.getAPI = function (url, isLoader, cbSuccess, cbError) {
            if (isLoader == true) {
                $rootScope.countLoader = $rootScope.countLoader + 1;if($rootScope.countLoader == 1)$rootScope.isShowPageLoader = true;
            }
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: url,
                withCredentials: true,
                headers: {
                    'Content-Type': 'text/plain'
                },
                timeout: CONST_SERVER_TIMEOUT
            }).success(function (data) {
                if (isLoader == true) {
                    $rootScope.countLoader = $rootScope.countLoader - 1;if($rootScope.countLoader == 0)$rootScope.isShowPageLoader = false;
                }
                if(data.success == -1){
                    deferred.reject();
                    $mdToast.show({
                        template: '<md-toast><span flex>Vui lòng đăng nhập!</span></md-toast>',
                        position: 'bottom right',
                        hideDelay: 3000
                    });
                    $state.go('phaojlar.default.signin');
                }else{
                    if (_.isFunction(cbSuccess)) {
                        cbSuccess(data);
                    }
                    deferred.resolve(data);
                }
            }).error(function (data, status, json) {
                if (_.isFunction(cbError)) {
                    cbError(data, status, json);
                }
                if (isLoader == true) {
                    $rootScope.countLoader = $rootScope.countLoader - 1;if($rootScope.countLoader == 0)$rootScope.isShowPageLoader = false;
                }
                deferred.reject();
            });
            return deferred.promise;
        };

        /**
         * POST api
         *
         * @param url
         * @param inputData
         * @param cbSuccess
         * @param cbError
         * @returns {Promise}
         */
        this.postAPI = function (url, isLoader, inputData, cbSuccess, cbError) {
            if (isLoader == true) {
                $rootScope.countLoader = $rootScope.countLoader + 1;if($rootScope.countLoader == 1)$rootScope.isShowPageLoader = true;
            }
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: url,
                withCredentials: true,
                headers: {
                    'Content-Type': 'text/plain'
                },
                data: inputData,
                timeout: CONST_SERVER_TIMEOUT
            }).success(function (data) {
                if (isLoader == true) {
                    $rootScope.countLoader = $rootScope.countLoader - 1;if($rootScope.countLoader == 0)$rootScope.isShowPageLoader = false;
                }
                if(data.success == -1){
                    deferred.reject();
                    $mdToast.show({
                        template: '<md-toast><span flex>Vui lòng đăng nhập!</span></md-toast>',
                        position: 'bottom right',
                        hideDelay: 3000
                    });
                    $state.go('phaojlar.default.signin');
                }else {
                    if (_.isFunction(cbSuccess)) {
                        cbSuccess(data);
                    }
                    deferred.resolve(data);
                }
            }).error(function (data, status, json) {
                console.log("false");
                if (_.isFunction(cbError)) {
                    cbError(data, status, json);
                }
                deferred.reject();
                if (isLoader == true) {
                    $rootScope.countLoader = $rootScope.countLoader - 1;if($rootScope.countLoader == 0)$rootScope.isShowPageLoader = false;
                }
            });
            return deferred.promise;
        };
    }
})();

