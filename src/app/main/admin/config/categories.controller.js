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
            });
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
                if(data.title != undefined)
                {
                    var nodeData = scope.$modelValue;
                    nodeData.childs.push({
                        id: "",
                        title: data.title,
                        alias: data.alias,
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
                if(data.title != undefined){
                    $scope.data.push({
                        id: "",
                        title: data.title,
                        alias: data.alias,
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
                    data: nodeData
                }
            }).then(function (data) {
                if(data.title != undefined)
                {
                    nodeData.title = data.title;
                    nodeData.alias = data.alias;
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
            var data = {
                childs:$scope.data
            };

            apiService.postAPI(SERVER_AUPDATECATEGORIES, true, data, function (e) {
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
            });
        }
    }
})();
