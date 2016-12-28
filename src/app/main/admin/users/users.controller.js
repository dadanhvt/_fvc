(function() {
    'use strict';

    angular
        .module('app.main.admin')
        .controller('AdminUsersController', AdminUsersController);

    /* @ngInject */
    function AdminUsersController($q, $timeout, $mdToast, $filter, $mdDialog, apiService) {
        var vm = this;
        vm.usersData =[];
        vm.openUser = openUser;
        vm.onPaginationChange = onPaginationChange;
        vm.onChangeFilter = onChangeFilter;
        vm.changeSearchText = changeSearchText;
        vm.changeSearchFeild = changeSearchFeild;
        vm.changUserRole = changUserRole;
        vm.addUser = addUser;
        /////////////////////////////////

        initData();
        createData();
        /////////////////////////////////

        function initData(){
            vm.query = {
                order: 'name',
                search: '',
                searchBy: 'name',
                role: '',
                limit: LIMIT_USER_LIST,
                page: 1
            };
            vm.searchBy = 'name';
            vm.userRole = "";
        }
        function changUserRole(userRole){
            vm.query.role = userRole;
            vm.query.page = 1;
            createData();
        }
        function changeSearchFeild(searchBy){
            vm.query.searchBy = searchBy;
            vm.query.page = 1;
            createData();
        }
        var delayTimer;
        function changeSearchText(search){
            clearTimeout(delayTimer);
            delayTimer = setTimeout(function() {
                vm.query.search = search;
                vm.query.page = 1;
                createData();
            }, 1000);
        }
        function onChangeFilter(order){
            vm.query.order = order;
            vm.query.page = 1;
            createData();
        }
        function onPaginationChange(page, limit){
            vm.query.page = page;
            vm.query.limit = limit;
            createData();
        }
        function openUser(user, $event) {
            $mdDialog.show({
                controller: 'AdminUserDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/main/admin/users/user-dialog.tmpl.html',
                locals: {
                    user: user
                },
                targetEvent: $event
            });
        }

        function createData() {
            apiService.getAPI(SERVER_GETUSERLIST+"?search="+vm.query.search+"&searchBy="+vm.query.searchBy+"&order="+vm.query.order+"&role="+vm.query.role+"&limit="+vm.query.limit+"&page="+vm.query.page,true, function(e){
                var isSuccess = e.success == 1;
                if(!isSuccess){
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Error')
                            .textContent('Cannot load data! please try again.')
                            .ok('OK!')
                    );
                    return;
                }
                vm.usersData = e.result;
            });
        }
        
        function addUser() {
            $mdDialog.show({
                controller: 'addUserController',
                controllerAs: 'vm',
                templateUrl: 'app/main/admin/users/user-add.tmpl.html',
                focusOnOpen: false
            });
        }
    }
})();
