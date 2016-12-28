/**
 * Created by kinhcan on 11/21/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.main.admin')
        .controller('EducationDetailController', EducationDetailController);

    /* @ngInject */
    function EducationDetailController($mdDialog, $mdToast, data, $q, $http) {
        var vm = this;
        vm.save = save;
        vm.addEducation = addEducation;
        vm.deleteEducation = deleteEducation;
        vm.schoolChange = schoolChange;
        vm.schoolTextChange = schoolTextChange;
        vm.year = [];
        init();
        function init() {
            for(i=1990;i<2051;i++) vm.year.push(i.toString());
            vm.isEdited = false;
            vm.degrees = CONST_DEGREE;
            vm.educations = data;
            // angular.forEach(vm.educations, function (value, key) {
            //     if (value.study_from != null)
            //         value.study_from = string2Date(value.study_from);
            //     if (value.study_to != null)
            //         value.study_to = string2Date(value.study_to);
            // });
            var tmp = {
                school_name: '',
                degree: '',
                feild: '',
                study_from:'',
                study_to: '',
                grade: '',
                desc: ''
            };
            if (data == undefined) vm.educations = [];
            vm.educations.push(tmp);
        }

        function schoolChange(item, school) {
            item.school_name = school.name;
        }

        var delayTimer;

        function schoolTextChange(item) {
            clearTimeout(delayTimer);
            var deferred = $q.defer();
            delayTimer = setTimeout(function () {
                $http({
                    method: 'GET',
                    url: SERVER_GETSUGGESTSCHOOLS + "?search=" + item.school_name,
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
            vm.educations.splice(vm.educations.length - 1, 1);
            var data = [];
            data.educations = vm.educations.filter(function (edu) {
                return edu.school_name.trim() != '';
            });
            data.isEdited = vm.isEdited;
            $mdDialog.hide(data);
        }

        function addEducation(index) {
            vm.isEdited = true;
            if (index == vm.educations.length - 1) {
                var  tmp={
                    school_name: '',
                    degree: '',
                    feild: '',
                    study_from: '',
                    study_to: '',
                    grade: '',
                    desc: ''
                };
                vm.educations.push(tmp);
            }
        }

        function deleteEducation(item) {vm.isEdited = true;
            vm.educations.splice(vm.educations.indexOf(item), 1);
            $mdToast.show({
                template: '<md-toast><span flex>Deleted</span></md-toast>',
                position: 'bottom right',
                hideDelay: 3000
            });
        }
    }
})();
