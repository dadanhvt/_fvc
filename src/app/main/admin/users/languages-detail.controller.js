/**
 * Created by kinhcan on 11/21/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.main.admin')
        .controller('LanguageDetailController', LanguageDetailController);

    /* @ngInject */
    function LanguageDetailController($mdDialog,$mdToast,data, languages) {
        var vm = this;
        vm.save=save;
        vm.addLanguage=addLanguage;
        vm.deleteLanguage=deleteLanguage;
        init();
        function init(){
            vm.isEdited = false;
            vm.languages = data;
            vm.db_languages = languages;
            var tmp ={
                language_id: null,
                proficiency: '',
                certificate: ''
            };
            if(data==undefined) vm.languages=[];
            vm.languages.push(tmp);
        }
        function save() {
            vm.languages.splice(vm.languages.length - 1, 1);
            var data = [];
            data.languages = vm.languages;
            data.isEdited = vm.isEdited;
            $mdDialog.hide(data);
        }
        function addLanguage(index) {
            vm.isEdited = true;
            if (index == vm.languages.length - 1) {
                var  tmp={
                    language_id: null,
                    proficiency: '',
                    certificate: ''
                };
                vm.languages.push(tmp);
            }
        }
        function deleteLanguage(item) {
            vm.isEdited = true;
            vm.languages.splice(vm.languages.indexOf(item), 1);
            $mdToast.show({
                template: '<md-toast><span flex>Deleted</span></md-toast>',
                position: 'bottom right',
                hideDelay: 3000
            });
        }
    }
})();
