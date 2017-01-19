/**
 * Created by kinhcan on 1/17/2017.
 */
(function () {
    'use strict';

    angular
        .module('app.main.job')
        .controller('FindJobController', FindJobController);

    function FindJobController(apiService){
        var vm = this;

        vm.jobPosition=[];
        vm.city = [];
        vm.limitMin = 5;
        vm.toggle =toggle;
        vm.showMore = showMore;
        vm.showLess = showLess;
        vm.changeSearchText=changeSearchText;
        vm.changCity =changCity;

        init();

        function init() {
            vm.limitLocation = vm.limitJobPostion = vm.limitMin;
            vm.country_code ="ABW";
            vm.job_position =CONST_JOB_FUNCTION;

            apiService.getAPI(SERVER_GETCOUNTRIES, false, function (e) {
                var isSuccess = e.success == 1;
                if (!isSuccess) {
                    return;
                }
                vm.countries=e.result;
                console.log(vm.countries);
            });
            changCity();
        }


        function toggle(item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            }
            else {
                list.push(item);
            }
        }

        function showMore(item) {
            switch (item) {
                case 'jobPosition':
                    vm.limitJobPostion = vm.job_position.length;
                    vm.checkJobPosition = true;
                    break;
                case 'location':
                    vm.limitLocation = vm.cities.length;
                    vm.checkLocation = true;
                    break;

            }
        }
        function showLess(item) {
            switch (item) {
                case 'jobPosition':
                    vm.limitJobPostion = vm.limitMin;
                    vm.checkJobPosition = false;
                    break;
                case 'location':
                    vm.limitLocation = vm.limitMin;
                    vm.checkLocation = false;
                    break;

            }
        }
        var delayTimer;

        function changeSearchText() {
            clearTimeout(delayTimer);
            delayTimer = setTimeout(function () {
                vm.query.page = 1;
                getData();
            }, 1000);
        }

        function changCity() {
            apiService.getAPI(SERVER_GETCITIESINCOUNTRY + "?code=" + vm.country_code, false, function (e) {
                if (!(e.success == 1)) {
                    return;
                }
                vm.cities = e.result;
            });
        }

    }
})();
