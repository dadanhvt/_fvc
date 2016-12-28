/**
 * Created by kinhcan on 11/21/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.main.admin')
        .controller('CertificationDetailController', CertificationDetailController);

    /* @ngInject */
    function CertificationDetailController($mdDialog,$mdToast,data) {
        var vm = this;
        vm.save=save;
        vm.addCertification=addCertification;
        vm.deleteCertification=deleteCertification;

        init();
        function init(){
            vm.isEdited = false;
            vm.certifications = data;
            angular.forEach(vm.certifications, function (value, key) {
                value.unexpire = value.unexpire == 1;
            });
            var tmp ={
                name: '',
                authority: '',
                desc :'',
                date_from :'',
                date_to : '',
                unexpire : 0
            };
            if(data==undefined) vm.certifications=[];
            vm.certifications.push(tmp);
        }

        function save() {
            vm.certifications.splice(vm.certifications.length - 1, 1);
            var data = [];
            data.certifications = vm.certifications.filter(function (edu) {
                return edu.name.trim() != '';
            });
            data.isEdited = vm.isEdited;
            $mdDialog.hide(data);
        }
        function addCertification(index) {
            vm.isEdited = true;
            if (index == vm.certifications.length - 1) {
                var tmp ={
                    name: '',
                    authority: '',
                    date_from : '',
                    date_to :'',
                    unexpire : 0
                };
                vm.certifications.push(tmp);
            }
        }
        function deleteCertification(item) {
            vm.isEdited = true;
            vm.certifications.splice(vm.certifications.indexOf(item), 1);
            $mdToast.show({
                template: '<md-toast><span flex>Deleted</span></md-toast>',
                position: 'bottom right',
                hideDelay: 3000
            });
        }
    }
})();
