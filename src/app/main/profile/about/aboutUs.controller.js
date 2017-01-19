/**
 * Created by kinhcan on 1/16/2017.
 */
(function () {
    'use strict';

    angular
        .module('app.main.profile')
        .controller('AboutUsController', AboutUsController);

    /* @ngInject */
    function AboutUsController($mdDialog,apiService,$mdToast,about,countries) {
        var vm = this;

        vm.cancel = cancel;
        vm.save = save;
        vm.changCity=changCity;

        init();
        function init() {
            vm.countries = countries;
            vm.about=angular.copy(about);
            changCity();
        }


        /////////////////////////
        function changCity() {
            apiService.getAPI(SERVER_GETCITIESINCOUNTRY + "?code=" + vm.about.profile.country_code, false, function (e) {
                if (!(e.success == 1)) {
                    return;
                }
                vm.cities = e.result;
            });
        }

        function save() {
            if (vm.about.name!= '') {
                var data = {
                    name : vm.about.name,
                    headline : vm.about.headline,
                    email : vm.about.email,
                    phone : vm.about.profile.phone,
                    summary : vm.about.profile.summary,
                    city : vm.about.profile.city,
                    country_code : vm.about.profile.country_code
                };
                apiService.postAPI(SERVER_EDITABOUTRE, false, data, function (e) {
                    if (e.success != 1) {
                        $mdToast.show({
                            template: '<md-toast><span flex>Cann\'t save, please try again!</span></md-toast>',
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
                    $mdDialog.hide(vm.about);
                });
            }
        }

        function cancel() {
            $mdDialog.cancel();
        }
    }
})();
