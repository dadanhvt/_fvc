/**
 * Created by kinhcan on 12/27/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.main.admin')
        .controller('AddItemController', AddItemController);

    /* @ngInject */
    function AddItemController($mdDialog,data) {
        var vm = this;

        vm.save =save;
        vm.title = data;

        function save() {
            var data = vm.title;
            $mdDialog.hide(data);
        }
    }
})();
