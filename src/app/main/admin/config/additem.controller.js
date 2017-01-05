/**
 * Created by kinhcan on 12/27/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.main.admin')
        .controller('AddItemController', AddItemController);

    /* @ngInject */
    function AddItemController($mdDialog,$mdToast,data,apiService) {
        var vm = this;



        vm.suggest = suggest;
        vm.checkAlias = checkAlias;
        vm.save =save;
        vm.cancel = cancel;

        init();

        function init() {
            vm.title = data.title;
            vm.alias = data.alias;
            vm.checkSave = true;
        }

        function suggest() {
            vm.alias = aliasConvert(vm.title) ;
        }

        function checkAlias() {
            var dataCheck = {
                id : data.id?data.id:'',
                alias : vm.alias
            };
            apiService.postAPI(SERVER_ACHECKCATEGORY, true, dataCheck, function (e) {
                if (e.success != 1) {
                    $mdToast.show({
                        template: '<md-toast><span flex>Error! Please try again.</span></md-toast>',
                        position: 'bottom right',
                        hideDelay: 3000
                    });
                    return;
                }
                if(e.result.not_exist ==true)
                {
                    vm.alias = e.result.alias;
                    if(vm.title==undefined){
                        $mdToast.show({
                            template: '<md-toast><span flex>Title require!</span></md-toast>',
                            position: 'bottom right',
                            hideDelay: 3000
                        });
                    }
                    else vm.checkSave=false;
                }
                else {
                    $mdToast.show({
                        template: '<md-toast><span flex>Alias exist!</span></md-toast>',
                        position: 'bottom right',
                        hideDelay: 3000
                    });
                }
            });
        }

        function save() {
            var data_return ={
                title : vm.title,
                alias : vm.alias
            };
            $mdDialog.hide(data_return);
        }

        function cancel() {
            var data_return ={};
            $mdDialog.hide(data_return);
        }
    }
})();
