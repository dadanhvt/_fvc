/**
 * Created by kinhcan on 10/10/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.main.profile')
        .controller('EditPostDialogController',EditPostDialogController);
    function EditPostDialogController($mdDialog, post, $mdToast) {
        var vm = this;
        vm.cancelClick = cancelClick;
        vm.saveClick = saveClick;
        init();
        function init() {
            vm.content = post.ContentPost;
        }
        function cancelClick() {
            $mdDialog.cancel();
        }
        function saveClick() {
            post.ContentPost = vm.content;
            $mdToast.show({
                template: '<md-toast><span flex>Updated</span></md-toast>',
                position: 'bottom right',
                hideDelay: 3000
            });
            $mdDialog.cancel();
        }
    }
})();
