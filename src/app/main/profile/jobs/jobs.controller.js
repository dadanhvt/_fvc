/**
 * Created by kinhcan on 1/16/2017.
 */
(function () {
    'use strict';

    angular
        .module('app.main.profile')
        .controller('JobsController', JobsController);
    function JobsController($mdDialog,$stateParams,apiService,$state){
        var vm = this;

        vm.newJob = newJob;
        vm.editJob=editJob;
        vm.getData = getData;

        init();
        function init() {
            vm.query = {
                limit: 5,
                page: 1
            };
            vm.server =SERVER_ASSETS+"upload/avatar/";
            vm.aboutUser = $stateParams.userId;
            getData();
        }

        function newJob() {
            $mdDialog.show({
                controller: 'NewJobController',
                templateUrl: 'app/main/profile/jobs/newjob.tmpl.html',
                controllerAs: 'vm',
                escapeToClose: false,
                locals: {
                    data: ''
                }
            }).then(function (data) {
                if(data.checkEdit ==false)
                {
                    vm.jobs.data.unshift(data.result);
                }
            })
        }
        function editJob(id,index) {
            $mdDialog.show({
                controller: 'NewJobController',
                templateUrl: 'app/main/profile/jobs/newjob.tmpl.html',
                controllerAs: 'vm',
                escapeToClose: false,
                locals: {
                    data: id
                }
            }).then(function (data) {
                if(data.checkEdit==true)
                {
                    vm.jobs.data.splice(index,1);
                    vm.jobs.data.unshift(data.result)
                }
            })

        }
        function getData() {
            apiService.getAPI(SERVER_GETJOBSBYUSERID + "?id=" + vm.aboutUser+"&page="+vm.query.page+"&limit="+vm.query.limit, true, function (e) {
                if (!(e.success == 1)) {
                    $state.go('phaojlar.default.profile.about',{userId: vm.aboutUser});
                    return;
                }
                vm.jobs = e.result;
            })
        }

    }
})();
