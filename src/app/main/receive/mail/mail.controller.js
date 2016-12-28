/**
 * Created by Tinti on 9/27/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.main.receive')
        .controller('MailController', MailController);

    /* @ngInject */
    function MailController($rootScope, apiService, $mdToast, $filter, $state, $mdDialog) {
        var vm = this;
        vm.reportClick = reportClick;
        init();
        function init() {
            vm.selectedtabIndex = 0;
        }
        function reportClick(){
            $state.go('phaojlar.menu.default.report');
        }
    }
})();