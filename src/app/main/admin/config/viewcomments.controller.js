/**
 * Created by kinhcan on 12/28/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.main.admin')
        .controller('ViewCommmentsController', ViewCommmentsController);

    /* @ngInject */
    function ViewCommmentsController($mdDialog,idPost,apiService,$mdToast) {
        var vm = this;

        vm.getComments = getComments;
        vm.updateStatus=updateStatus;
        vm.close = close;

        init();

        function init() {
            vm.query={
                page : 1,
                limit : 10
            };
            getComments();
        }
        function getComments() {
            apiService.getAPI(SERVER_GETFORUMCOMMENTS+"?id="+idPost+"&page="+vm.query.page+"&limit="+vm.query.limit, true, function (e) {
                if (e.success != 1) {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Error')
                            .textContent('Cannot load data! please try again.')
                            .ok('OK!')
                    );
                    return;
                }
                vm.comments= e.result;
            });
        }
        function updateStatus(comment) {
            var data={
                id : comment.id,
                status : comment.status
            };
            apiService.postAPI(SERVER_ACHANGEPOSTSTATUS, true, data, function (e) {
                if (e.success != 1) {
                    $mdToast.show({
                        template: '<md-toast><span flex>Error! Please try again.</span></md-toast>',
                        position: 'bottom right',
                        hideDelay: 3000
                    });
                    return;
                }
                console.log(e);
                $mdToast.show({
                    template: '<md-toast><span flex>Updated!</span></md-toast>',
                    position: 'bottom right',
                    hideDelay: 3000
                });
                getComments();
            });
        }
        function close() {
            $mdDialog.hide(vm.comments.total);
        }
    }
})();
