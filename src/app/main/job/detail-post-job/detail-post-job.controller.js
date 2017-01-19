/**
 * Created by kinhcan on 1/17/2017.
 */
(function () {
    'use strict';

    angular
        .module('app.main.job')
        .controller('DetailPostJobController', DetailPostJobController);

    function DetailPostJobController($mdToast, apiService,$stateParams){
        var vm = this;

        init();

        function init() {
            vm.server =SERVER_ASSETS+"upload/avatar/";
            vm.jobId = $stateParams.jobId;
            apiService.getAPI(SERVER_GETJOBBYID+"?id="+vm.jobId, false, function (e) {
                var isSuccess = e.success == 1;
                if (!isSuccess) {
                    return;
                }
                vm.job = e.result;
                console.log(vm.job);
            });

        }

    }
})();
