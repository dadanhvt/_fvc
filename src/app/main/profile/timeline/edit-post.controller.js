/**
 * Created by kinhcan on 10/10/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.main.profile')
        .controller('EditPostDialogController',EditPostDialogController);
    function EditPostDialogController($mdDialog, post, $mdToast, apiService) {
        var vm = this;
        vm.cancelClick = cancelClick;
        vm.saveClick = saveClick;
        init();
        function init() {
            vm.post={
                contents: post.contents,
                id: post.id
            };
        }
        function cancelClick() {
            $mdDialog.cancel();
        }
        function saveClick() {
            apiService.postAPI(SERVER_EDITPOST, true, vm.post, function (e) {
                if (e.success != 1) {
                    $mdToast.show({
                        template: '<md-toast><span flex>Cann\'t update, please try again!</span></md-toast>',
                        position: 'bottom right',
                        hideDelay: 3000
                    });
                    return;
                }
                $mdToast.show({
                    template: '<md-toast><span flex>Updated</span></md-toast>',
                    position: 'bottom right',
                    hideDelay: 3000
                });
                post.contents = vm.post.contents;
                $mdDialog.cancel();
            });
        }
    }
})();
