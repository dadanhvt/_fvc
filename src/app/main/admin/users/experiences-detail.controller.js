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
        vm.month=['01','02','03','04','05','06','07','08','09','10','11','12'];
        vm.year =[];
        init();
        function init() {
            for(i=1990;i<2051;i++) vm.year.push(i.toString());
            vm.isEdited = false;
            vm.experiences = data;
            angular.forEach(vm.experiences, function (value, key) {
                if (value.work_from != null)
                {
                    var date = value.work_from.split("-");
                    value.work_from_month = date[1];
                    value.work_from_year = date[0];
                }else{
                    value.work_from_month = "";
                    value.work_from_year = "";
                }
                if (value.work_to != null)
                {
                    var date1 = value.work_to.split("-");
                    value.work_to_month = date1[1];
                    value.work_to_year = date1[0];
                }else{
                    value.work_to_month = "";
                    value.work_to_year = "";
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
            var data = [];
            data.experiences = vm.experiences.filter(function (edu) {
                return edu.company_name.trim() != '';
            });
            data.experiences = data.experiences.map(function(item){
                return {
                    company_name: item.company_name,
                    location: item.location,
                    title: item.title,
                    desc: item.desc,
                    work_from: item.work_from_year+'-'+item.work_from_month,
                    work_to: item.work_to_year+'-'+item.work_to_month,
                    currently: item.currently
                }
            });
            data.isEdited = vm.isEdited;
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
