/**
 * Created by kinhcan on 11/21/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.main.admin')
        .controller('ExperienceDetailController', ExperienceDetailController);

    /* @ngInject */
    function ExperienceDetailController($mdDialog, $mdToast, data, $q, $http) {
        var vm = this;
        vm.save = save;
        vm.addExperience = addExperience;
        vm.deleteExperience = deleteExperience;
        vm.companyChange = companyChange;
        vm.companyTextChange = companyTextChange;
        init();
        function init() {
            vm.isEdited = false;
            vm.experiences = data;

            angular.forEach(vm.experiences, function (value, key) {
                if (value.work_from != null||value.work_from != "")
                {
                    var date = value.work_from.split("-");
                    value.work_from_month = date[1];
                    value.work_from_year = date[0];
                    value.work_from="";
                }else{
                    value.work_from_month = "";
                    value.work_from_year = "";
                    value.work_from="";
                }
                if (value.work_to != null||value.work_to != "")
                {
                    var date1 = value.work_to.split("-");
                    value.work_to_month = date1[1];
                    value.work_to_year = date1[0];
                    value.work_to="";
                }else{
                    value.work_to_month = "";
                    value.work_to_year = "";
                    value.work_to="";
                }
                value.currently = value.currently == 1;
            });

            var tmp = {
                company_name: '',
                location: '',
                title: '',
                desc: '',
                work_from: '',
                work_to: '',
                currently: 0
            };
            if (data == undefined) vm.experiences = [];
            vm.experiences.push(tmp);
        }
        function companyChange(item, company) {
            item.company_name = company.name;
        }

        var delayTimer;

        function companyTextChange(item) {
            clearTimeout(delayTimer);
            var deferred = $q.defer();
            delayTimer = setTimeout(function () {
                $http({
                    method: 'GET',
                    url: SERVER_GETSUGGESTCOMPANIES + "?search=" + item.company_name,
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'text/plain'
                    },
                    timeout: CONST_SERVER_TIMEOUT
                }).success(function (data) {
                    deferred.resolve(data.result);
                }).error(function () {
                });
            }, 1000);
            return deferred.promise;
        }

        function save() {
            vm.experiences.splice(vm.experiences.length - 1, 1);
            var experiences=[];
            for(var i=0;i<vm.experiences.length;i++)
                if(vm.experiences[i].company_name!=="")
                {
                    if(vm.experiences[i].work_from_year==undefined) vm.experiences[i].work_from_year='0000';
                    if(vm.experiences[i].work_from_month==undefined) vm.experiences[i].work_from_month='00';
                    if(vm.experiences[i].work_to_year==undefined) vm.experiences[i].work_to_year='0000';
                    if(vm.experiences[i].work_to_month==undefined) vm.experiences[i].work_to_month='00';
                    var tmp={
                        company_name :vm.experiences[i].company_name,
                        currently : vm.experiences[i].currently,
                        desc : vm.experiences[i].desc,
                        id : vm.experiences[i].id,
                        location : vm.experiences[i].location,
                        title : vm.experiences[i].title,
                        user_id : vm.experiences[i].user_id,
                        work_from : vm.experiences[i].work_from_year+'-'+vm.experiences[i].work_from_month,
                        work_to : vm.experiences[i].work_to_year+'-'+vm.experiences[i].work_to_month
                    };
                    experiences.push(tmp);
                }
                var data={
                    experiences : experiences,
                    isEdited :vm.isEdited
                };
            $mdDialog.hide(data);
        }

        function addExperience(index) {
            vm.isEdited = true;
            if (index == vm.experiences.length - 1) {
                var tmp = {
                    company_name: '',
                    location: '',
                    title: '',
                    desc: '',
                    work_from_year:'',
                    work_to_year:'',
                    work_to_month :'',
                    work_from_month:'',
                    work_from: '',
                    work_to: '',
                    currently: 0
                };
                vm.experiences.push(tmp);
            }
        }

        function deleteExperience(item) {vm.isEdited = true;
            vm.experiences.splice(vm.experiences.indexOf(item), 1);
            $mdToast.show({
                template: '<md-toast><span flex>Deleted</span></md-toast>',
                position: 'bottom right',
                hideDelay: 3000
            });
        }
    }
})();
