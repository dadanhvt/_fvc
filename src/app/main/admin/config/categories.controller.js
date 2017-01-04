 (function() {
    'use strict';

    angular
        .module('app.main.admin')
        .controller('AdminCategoriesController', AdminCategoriesController);

    /* @ngInject */
    function AdminCategoriesController($scope,$mdToast,$mdDialog,$anchorScroll,$location,$timeout,apiService) {

        $scope.newSubItem =newSubItem;
        $scope.addNewCategory = addNewCategory;
        $scope.editItem = editItem;
        $scope.removeItem =removeItem;
        $scope.toggle = toggle;
        $scope.moveLastToTheBeginning = moveLastToTheBeginning;
        $scope.save = save;

        init();

        function init() {
            $timeout(function() {
                $location.hash('user-list-go-bottom');
                $anchorScroll();
            });
            $scope.check =true;
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
                $scope.data = e.result;
                console.log($scope.data);
            });
            // $scope.data = [{
            //     'id': 1,
            //     'title': 'node1',
            //     'status' : false,
            //     'nodes': [
            //         {
            //             'id': 11,
            //             'title': 'node1.1',
            //             'status' : false,
            //             'nodes': []
            //         },
            //         {
            //             'id': 12,
            //             'title': 'node1.2',
            //             'status' : true,
            //             'nodes': []
            //         }
            //     ]
            // }, {
            //     'id': 2,
            //     'title': 'node2',
            //     'status' : true,
            //     'nodes': [
            //         {
            //             'id': 21,
            //             'title': 'node2.1',
            //             'status' : false,
            //             'nodes': []
            //         },
            //         {
            //             'id': 22,
            //             'title': 'node2.2',
            //             'status' : false,
            //             'nodes': []
            //         }
            //     ]
            // }, {
            //     'id': 3,
            //     'title': 'node3',
            //     'status' : true,
            //     'nodes': [
            //         {
            //             'id': 31,
            //             'title': 'node3.1',
            //             'status' : false,
            //             'nodes': []
            //         }
            //     ]
            // }];
        }

        function newSubItem(scope) {
            $mdDialog.show({
                controller: 'AddItemController',
                templateUrl: 'app/main/admin/config/additem.tmpl.html',
                controllerAs: 'vm',
                escapeToClose: false,
                locals : {
                    data:''
                }
            }).then(function (data) {
                if(data!='')
                {
                    var nodeData = scope.$modelValue;
                    nodeData.childs.push({
                        id: nodeData.id * 10 + nodeData.childs.length + 1,
                        title: data,
                        status :1,
                        childs: []
                    });
                    $mdToast.show({
                        template: '<md-toast><span flex>Add new Thread</span></md-toast>',
                        position: 'bottom right',
                        hideDelay: 3000
                    });
                }
            });
        }

        function addNewCategory() {
            $mdDialog.show({
                controller: 'AddItemController',
                templateUrl: 'app/main/admin/config/additem.tmpl.html',
                controllerAs: 'vm',
                escapeToClose: false,
                locals : {
                    data:''
                }
            }).then(function (data) {
                if(data!=''){
                    $scope.data.push({
                        id: $scope.data.length + 1,
                        title: data,
                        status: 1,
                        childs: []
                    });
                    $mdToast.show({
                        template: '<md-toast><span flex>Add new Category</span></md-toast>',
                        position: 'bottom right',
                        hideDelay: 3000
                    });
                }
            });
        }
        function editItem(scope) {
            var nodeData = scope.$modelValue;
            $mdDialog.show({
                controller: 'AddItemController',
                templateUrl: 'app/main/admin/config/additem.tmpl.html',
                controllerAs: 'vm',
                escapeToClose: false,
                locals : {
                    data: nodeData.title
                }
            }).then(function (data) {
                if(data!=undefined){
                    nodeData.title = data;
                    $mdToast.show({
                        template: '<md-toast><span flex>Updated</span></md-toast>',
                        position: 'bottom right',
                        hideDelay: 3000
                    });
                }
            });


        }

        function removeItem(scope) {
            scope.remove();
            $mdToast.show({
                template: '<md-toast><span flex>Deleted</span></md-toast>',
                position: 'bottom right',
                hideDelay: 3000
            });
        }

        function toggle(scope) {
            console.log(scope);
            scope.toggle();
        }

        function moveLastToTheBeginning() {
            var a = $scope.data.pop();
            $scope.data.splice(0, 0, a);
        }

        //
        $scope.collapseAll = function () {
            $scope.$broadcast('angular-ui-tree:collapse-all');
            $scope.check = false;
        };
        //
        $scope.expandAll = function () {
            $scope.$broadcast('angular-ui-tree:expand-all');
            $scope.check = true;

        };

        function save() {
            var data = $scope.data;

            //console.log(data);
            var string=aliasConvert(data[1].title);
            console.log(string);
            var result={};
            // for(var i =0; data.length ;i++)
            // {
            //
            // }
        }
    }
})();
