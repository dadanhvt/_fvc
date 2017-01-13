/**
 * Created by kinhcan on 12/27/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.main.admin')
        .controller('AdminPostsController', AdminPostsController);

    /* @ngInject */
    function AdminPostsController($anchorScroll,$location,$timeout,$mdDialog,$mdToast ,apiService) {
        var vm = this;

        vm.viewComments = viewComments;
        vm.updateCategory =updateCategory;
        vm.updateStatus = updateStatus;
        vm.changeSearchText =changeSearchText;
        vm.getData = getData;

        init();

        function init() {
            $timeout(function() {
                $location.hash('user-list-go-bottom');
                $anchorScroll();
            });
            vm.query={
                folder_id : '',
                search : '',
                page : 1,
                limit : LIMIT_PAGE
            };
            apiService.getAPI(SERVER_AGETCATEGORIES, true, function (e) {
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
                vm.categories= e.result;
            });
            getData();
        }

        function viewComments(post) {
            console.log(post);
            $mdDialog.show({
                controller: 'ViewCommmentsController',
                templateUrl: 'app/main/admin/config/viewcomments.tmpl.html',
                controllerAs: 'vm',
                escapeToClose: false,
                locals : {
                    idPost:post.id
                }
            }).then(function (total) {
                if(post.comments != total) getData();
            })
        }
        function updateCategory(post) {
            var data={
                id : post.id,
                folder_id : post.folder_id
            };
            apiService.postAPI(SERVER_ACHANGEPOSTCATEGORY, true, data, function (e) {
                if (e.success != 1) {
                    $mdToast.show({
                        template: '<md-toast><span flex>Error! Please try again.</span></md-toast>',
                        position: 'bottom right',
                        hideDelay: 3000
                    });
                    return;
                }
                $mdToast.show({
                    template: '<md-toast><span flex>Updated!</span></md-toast>',
                    position: 'bottom right',
                    hideDelay: 3000
                });
                getData();
            });
        }
        function updateStatus(post) {
            var data={
                id : post.id,
                status : post.status
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
                $mdToast.show({
                    template: '<md-toast><span flex>Updated!</span></md-toast>',
                    position: 'bottom right',
                    hideDelay: 3000
                });
                getData();
            });
        }

        var delayTimer;
        function changeSearchText() {
            clearTimeout(delayTimer);
            delayTimer = setTimeout(function () {
                vm.query.page = 1;
                getData();
            }, 1000);
        }

        function getData() {
            apiService.getAPI(SERVER_AGETFORUMPOST+"?folder_id="+vm.query.folder_id+"&search="+vm.query.search+"&page="+vm.query.page+"&limit="+vm.query.limit, true, function (e) {
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
                vm.posts = e.result;
            });

        }
    }
})();
