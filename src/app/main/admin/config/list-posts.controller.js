/**
 * Created by kinhcan on 12/27/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.main.admin')
        .controller('AdminPostsController', AdminPostsController);

    /* @ngInject */
    function AdminPostsController($anchorScroll,$location,$timeout,$mdDialog) {
        var vm = this;
        
        vm.viewcomments = viewcomments;

        init();

        function init() {
            $timeout(function() {
                $location.hash('user-list-go-bottom');
                $anchorScroll();
            });
            vm.posts = [
                {
                    title : "This is posts 1",
                    link :"#/admin/forum/categories",
                    author : "kinhcan",
                    categories : "Categories 1",
                    thread : "Thread 1",
                    comments : 12,
                    likes : 10,
                    date :"11/12/2016",
                    status : "1"
                },
                {
                    title : "This is posts 2",
                    link :"#/admin/forum/categories",
                    author : "kinhcan",
                    categories : "Categories 2",
                    thread : "Thread 2",
                    comments : 122,
                    likes : 102,
                    date :"11/12/2016",
                    status : "0"
                }
            ]
        }
        
        function viewcomments() {
            $mdDialog.show({
                controller: 'ViewCommmentsController',
                templateUrl: 'app/main/admin/config/viewcomments.tmpl.html',
                controllerAs: 'vm',
                escapeToClose: false,
                locals : {
                    data:''
                }
            })
        }
    }
})();
