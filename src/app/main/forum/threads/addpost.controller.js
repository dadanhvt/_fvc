/**
 * Created by kinhcan on 1/4/2017.
 */
(function () {
    'use strict';

    angular
        .module('app.main.forum')
        .controller('AddPostController', AddPostController);

    /* @ngInject */
    function AddPostController($mdDialog,apiService,$mdToast,alias) {
        var vm = this;

        vm.cancel = cancel;
        vm.save = save;
        vm.post = {
            alias : alias,
            name: '',
            content: ''
        };

        /////////////////////////

        function save() {
            if (vm.post.title!= '' && vm.post.content!= '') {
                var param = {
                    alias : alias,
                    name: vm.post.title,
                    contents: vm.post.content
                };
                apiService.postAPI(SERVER_POSTADDPOSTFORUM, false, param, function (e) {
                    if (e.success != 1) {
                        $mdToast.show({
                            template: '<md-toast><span flex>Cann\'t add new Post, please try again!</span></md-toast>',
                            position: 'bottom right',
                            hideDelay: 3000
                        });
                        return;
                    }else $mdDialog.hide(e.result.alias);
                });
            }
        }

        function cancel() {
            $mdDialog.cancel();
        }
    }
})();
