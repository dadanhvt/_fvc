(function() {
    'use strict';

    angular
        .module('app.main.admin')
        .controller('AdminUserDialogController', AdminUserDialogController);

    /* @ngInject */
    function AdminUserDialogController($window, $mdDialog, user, apiService, $mdToast, $rootScope) {
        var vm = this;
        vm.cancelClick = cancelClick;
        vm.okClick = okClick;
        vm.user = user;
        vm.userTmp = {
            'id': user.id,
            'name' : user.name,
            'email': user.email,
            'role' : user.role,
            'wallet': parseInt(user.wallet),
            'password': ''
        };
        vm.repos =[];
        vm.printClick = printClick;
        vm.resetClick = resetClick;
        vm.updateUserClick = updateUserClick;
        vm.addWebsite = addWebsite;
        vm.deleteWebsite = deleteWebsite;
        vm.initWebsite = initWebsite;
        vm.initRelation = initRelation;
        vm.onActiveChange = onActiveChange;
        vm.updateWebsiteClick = updateWebsiteClick;
        vm.querySearchUser = querySearchUser;
        vm.addDecentralization = addDecentralization;
        vm.deleteRelation = deleteRelation;
        vm.websites = [];
        vm.relations = [];
        initController();

        ////////////////
        function initController(){
            if (user.role == "CUS_BASIC" || user.role == "CUS_VIP" || user.role == "CUS_PENTIUM"){
                vm.initWebsite();
            }
                vm.initRelation();
        }
        function initRelation(){
            apiService.getAPI(SERVER_GETRELATIONSADMIN+"?id="+user.id,true, function(e){
                var isSuccess = e.success == 1;
                if(!isSuccess){
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Error')
                            .textContent('Cannot get relations admin.')
                            .ok('OK!')
                    );
                    return;
                }
                vm.relations = e.result;
            });
            vm.position = "TS";
            loadAllUser();
        }
        function initWebsite(){
            apiService.getAPI(SERVER_GETWEBSITELISTADMIN+"?id="+user.id,true, function(e){
                var isSuccess = e.success == 1;
                if(!isSuccess){
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Error')
                            .textContent('Cannot get websites admin.')
                            .ok('OK!')
                    );
                    return;
                }
                vm.websites = e.result.websites;
            });
        }
        function loadAllUser() {
            apiService.getAPI(SERVER_GETRELATIONSLISTADMIN+"?id="+user.id,true, function(e){
                var isSuccess = e.success == 1;
                if(!isSuccess){
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Error')
                            .textContent('Cannot get users DECENTRALIZATION admin.')
                            .ok('OK!')
                    );
                    return;
                }
                var repos = e.result;
                vm.repos = repos.map( function (repo) {
                    repo.value = repo.name.toLowerCase();
                    return repo;
                });
            });
        }
        function querySearchUser(query) {
            var results = query ? vm.repos.filter( createFilterFor(query) ) : vm.repos,
                deferred;
            return results;
        }
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(item) {
                return (item.value.indexOf(lowercaseQuery) === 0);
            };

        }
        function onActiveChange(isActive){
            if (isActive == 1){
                isActive = 0;
            }else{
                isActive = 1;
            }
        }
        function okClick() {
            $mdDialog.hide();
        }

        function cancelClick() {
            $mdDialog.cancel();
        }

        function printClick() {
            $window.print();
        }

        function resetClick() {
            vm.userTmp = {
                'id': user.id,
                'name' : user.name,
                'email': user.email,
                'role' : user.role,
                'wallet': user.wallet,
                'password': ''
            };
        }
        function updateUserClick(){
            apiService.postAPI(SERVER_EDITUSER,true, vm.userTmp, function(e){
                var isSuccess = e.success == 1;
                if(!isSuccess){
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Error')
                            .textContent('Update cannot be save! please try again.')
                            .ok('OK!')
                    );
                    return;
                }
                user.name = vm.userTmp.name;
                user.role = vm.userTmp.role;
                user.wallet = vm.userTmp.wallet;
                $mdToast.show({
                    template: '<md-toast><span flex>Update User success.</span></md-toast>',
                    position: 'bottom right',
                    hideDelay: 3000
                });
                if (user.id == $rootScope.user.id){
                    $rootScope.user = user;
                }
            });
        }
        function addWebsite(name, url){
            var newWebsite={
                id: "",
                user_id: user.id,
                website_id: "",
                website:{
                    id: "",
                    name: name,
                    url: url,
                    status: 1
                },
                status:1
            };
            vm.websites.push(newWebsite);
            vm.websiteName = ''; vm.websiteUrl = '';
        }
        function deleteWebsite(index){
            vm.websites.splice(index, 1);
        }
        function updateWebsiteClick(){
            var data = {
                user_id: user.id,
                websites: vm.websites
            };
            apiService.postAPI(SERVER_SETWEBSITELIST,true, data, function(e){
                var isSuccess = e.success == 1;
                if(!isSuccess){
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Error')
                            .textContent('Update cannot be save! please try again.')
                            .ok('OK!')
                    );
                    return;
                }
                $mdToast.show({
                    template: '<md-toast><span flex>Update Websites success.</span></md-toast>',
                    position: 'bottom right',
                    hideDelay: 3000
                });
                vm.websites = e.result;
            });
        }
        function addDecentralization(){
            var position = vm.position;
            if (vm.selectedItem.role == "ADMIN" || vm.selectedItem.role == "EMP"){
                position = 'SP';
            }
            var data = {
                u1: user.id,
                u2: vm.selectedItem.id,
                position: position
            };
            apiService.postAPI(SERVER_ADDRELATION,true, data, function(e){
                var isSuccess = e.success == 1;
                if(!isSuccess){
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Error')
                            .textContent('Add relation cannot be save! please try again.')
                            .ok('OK!')
                    );
                    return;
                }
                $mdToast.show({
                    template: '<md-toast><span flex>Add relation success.</span></md-toast>',
                    position: 'bottom right',
                    hideDelay: 3000
                });
                vm.relations.inferiors.push(e.user);
                vm.position = "TS";
                for(var i=0;i<vm.repos.length;i++){
                    if(vm.selectedItem.id == vm.repos[i].id){
                        vm.repos.splice(i,1);
                        break;
                    }
                }
                vm.selectedItem = undefined;
                vm.searchText = '';
            });
        }
        function deleteRelation(index, u){
            var r = confirm("Are you sure to delete this relation!");
            if (r == true) {
                var data = {
                    u1: user.id,
                    u2: u.id
                };
                apiService.postAPI(SERVER_DELETERELATION,true, data, function(e){
                    var isSuccess = e.success == 1;
                    if(!isSuccess){
                        $mdDialog.show(
                            $mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title('Error')
                                .textContent('Cannot delete relation! please try again.')
                                .ok('OK!')
                        );
                        return;
                    }
                    $mdToast.show({
                        template: '<md-toast><span flex>Delete relation success.</span></md-toast>',
                        position: 'bottom right',
                        hideDelay: 3000
                    });
                    user.value = user.name.toLowerCase();
                    vm.repos.push(user);
                    vm.relations.inferiors.splice(index, 1);
                });
            } else {
            }
        }
    }
})();
