(function ()
{
    'use strict';

    angular
        .module('app.main.mail')
        .controller('ComposeDialogController', ComposeDialogController);

    /** @ngInject */
    function ComposeDialogController($mdDialog, $q, $http,apiService, $mdToast, selected)
    {
        var vm = this;
        vm.cancelClick = cancelClick;
        vm.querySearch = querySearch;
        vm.sendMail = sendMail;
        init();
        function init() {
            if(selected){
                vm.selectedUser = selected;
            }

            vm.form = {
                subject: '',
                contents:''
            }
        }
        var delayTimer;

        function querySearch(item) {
            clearTimeout(delayTimer);
            var deferred = $q.defer();
            delayTimer = setTimeout(function () {
                $http({
                    method: 'GET',
                    url: SERVER_GETSUGGESTMAILUSERS + "?search=" + vm.searchText,
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'text/plain'
                    },
                    timeout: CONST_SERVER_TIMEOUT
                }).success(function (data) {
                    deferred.resolve(data.result);
                }).error(function () {
                });
            }, 1000);
            return deferred.promise;
        }
        function cancelClick() {
            $mdDialog.cancel();
        }
        function sendMail() {
            if(vm.selectedUser != null){
                var data = {
                    contents: vm.form.contents,
                    subject: vm.form.subject
                };
                data.to_id = [];
                data.to_id.push(vm.selectedUser.id);
                apiService.postAPI(SERVER_POSTNEWMAIL, true, data, function (e) {
                    if (e.success != 1) {
                        $mdToast.show({
                            template: '<md-toast><span flex>Cann\'t add send mail, please try again!</span></md-toast>',
                            position: 'bottom right',
                            hideDelay: 3000
                        });
                        return;
                    }
                    $mdToast.show({
                        template: '<md-toast><span flex>Mail was sent!</span></md-toast>',
                        position: 'bottom right',
                        hideDelay: 3000
                    });
                    $mdDialog.hide();
                });
            }
        }
    }
})();
