/**
 * Created by Tinti on 11/1/2016.
 */
(function () {
    'use strict';

    angular
        .module('phaojlar.components')
        .controller('SigninDialogController', SigninDialogController);

    /* @ngInject */
    function SigninDialogController($mdDialog, $state) {
        var vm = this;
        vm.cancelClick = cancelClick;
        function cancelClick() {
            $mdDialog.cancel();
        }
    }
})();
