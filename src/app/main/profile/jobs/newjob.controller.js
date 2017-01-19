/**
 * Created by kinhcan on 1/16/2017.
 */
(function () {
    'use strict';

    angular
        .module('app.main.profile')
        .controller('NewJobController', NewJobController);

    function NewJobController(apiService,$mdDialog,$rootScope,$mdToast,data){
        var vm = this;

        vm.changCity=changCity;
        vm.cancel =cancel;
        vm.save = save;

        init();
        function init() {
            if(data!='')
            {
                apiService.getAPI(SERVER_GETJOBBYID+"?id="+data, false, function (e) {
                    var isSuccess = e.success == 1;
                    if (!isSuccess) {
                        return;
                    }
                    vm.job = e.result;
                    if(vm.job.status==3) vm.job.hide=true;
                    else vm.job.hide=false;
                    if(vm.job.end_date!=null) vm.job.end_date=string2Date(vm.job.end_date);
                    changCity();
                });
            }

            apiService.getAPI(SERVER_GETCOUNTRIES, false, function (e) {
                var isSuccess = e.success == 1;
                if (!isSuccess) {
                    return;
                }
                vm.countries=e.result;
            });
        }

        function changCity() {
            apiService.getAPI(SERVER_GETCITIESINCOUNTRY + "?code=" + vm.job.country_code, false, function (e) {
                if (!(e.success == 1)) {
                    return;
                }
                vm.cities = e.result;
            });
        }

        function cancel() {
            $mdDialog.cancel();
        }

        function save() {
            var data1={
                title : vm.job.title,
                user_id : $rootScope.profileUser,
                country_code :vm.job.country_code,
                city : vm.job.city,
                min_salary : vm.job.min_salary,
                max_salary : vm.job.max_salary,
                competitive : vm.job.competitive,
                contents : vm.job.contents,
                hide : vm.job.hide,
                end_date : date2String(vm.job.end_date)
            };
            if(data!='') {
                data1.id=vm.job.id;
                apiService.postAPI(SERVER_EDITJOB, true, data1, function (e) {
                    if (e.success != 1) {
                        $mdToast.show({
                            template: '<md-toast><span flex>Error! Please try again.</span></md-toast>',
                            position: 'bottom right',
                            hideDelay: 3000
                        });
                        return;
                    }
                    else {
                        $mdToast.show({
                            template: '<md-toast><span flex>Updated!</span></md-toast>',
                            position: 'bottom right',
                            hideDelay: 3000
                        });

                        var data={
                            checkEdit : true,
                            result : e.result
                        };
                        $mdDialog.hide(data);
                    }

                });
            }
            else {
                apiService.postAPI(SERVER_ADDNEWJOB, true, data1, function (e) {
                    if (e.success != 1) {
                        $mdToast.show({
                            template: '<md-toast><span flex>Error! Please try again.</span></md-toast>',
                            position: 'bottom right',
                            hideDelay: 3000
                        });
                        return;
                    }{
                        $mdToast.show({
                            template: '<md-toast><span flex>Updated!</span></md-toast>',
                            position: 'bottom right',
                            hideDelay: 3000
                        });
                        var data={
                            checkEdit : false,
                            result : e.result
                        };
                        $mdDialog.hide(data);
                    }
                });
            }
        }


    }
})();
