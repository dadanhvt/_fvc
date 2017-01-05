/**
 * Created by kinhcan on 12/28/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.main.admin')
        .controller('ViewCommmentsController', ViewCommmentsController);

    /* @ngInject */
    function ViewCommmentsController($mdDialog) {
        var vm = this;

        vm.save = save;

        init();

        function init() {
            vm.comments =[
                {
                    content : "comment 1",
                    author : "kinhcan",
                    date : "05/10/2016",
                    status : "0"
                },
                {
                    content : "comment 2",
                    author : "acer",
                    date : "05/10/2016",
                    status : "1"
                }
            ]

        }
        function save() {
            $mdDialog.hide();
        }
    }
})();