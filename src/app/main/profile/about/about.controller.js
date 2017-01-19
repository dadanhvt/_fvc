/**
 * Created by kinhcan on 10/10/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.main.profile')
        .controller('AboutController', AboutController);
    function AboutController($mdToast, apiService, $rootScope, $stateParams,$mdDialog) {
        var vm = this;

        vm.changCity =changCity;
        vm.edit = edit;
        vm.cancer = cancer;
        vm.save = save;
        vm.DisableCancer = DisableCancer;

        init();
        function init() {
            vm.job_functions = CONST_JOB_FUNCTION;
            apiService.getAPI(SERVER_GETCOUNTRIES, false, function (e) {
                var isSuccess = e.success == 1;
                if (!isSuccess) {
                    return;
                }
                vm.countries=e.result;
            });
            //get basic about
            vm.aboutUser = $stateParams.userId;
            apiService.getAPI(SERVER_GETPROFILEABOUT + "?id=" + vm.aboutUser, true, function (e) {
                if (!(e.success == 1)) {
                    return;
                }
                vm.about = e.result;


                apiService.getAPI(SERVER_GETCITIESINCOUNTRY + "?code=" + vm.about.profile.country_code, false, function (e) {
                    if (!(e.success == 1)) {
                        return;
                    }
                    vm.cities = e.result;
                });

                if(vm.about.birth != "" && vm.about.birth != null){
                    vm.about.birth = string2Date(vm.about.birth);
                }else{
                    vm.about.birth = undefined;
                }
            });
        }
        function changCity() {
            apiService.getAPI(SERVER_GETCITIESINCOUNTRY + "?code=" + vm.about.profile.country_code, false, function (e) {
                if (!(e.success == 1)) {
                    return;
                }
                vm.cities = e.result;
            });
        }
        ///// DisableCancer When change ////
        function DisableCancer(item) {
            switch (item) {
                case 'Info':
                    vm.changeInfo = true;
                    break;
                case 'Contact':
                    vm.changeContact = true;
                    break;
                case 'Summary':
                    vm.changeSummary = true;
                    break;
            }
        }

        /////// EDIT BUTTON ///////////

        function  edit(item) {
            switch (item) {
                case 'Info':
                    vm.editInfo = true;
                    break;
                case 'Contact':
                    vm.editContact = true;
                    break;
                case 'Summary':
                    vm.editSummary = true;
                    break;
                case 'Languages':
                    apiService.getAPI(SERVER_GETLANGUAGES, false, function (e) {
                        var isSuccess = e.success == 1;
                        if (!isSuccess) {
                            return;
                        }
                        vm.languages=e.result;

                        $mdDialog.show({
                            controller: 'LanguageDetailController',
                            templateUrl: 'app/main/admin/users/languages-detail.tmpl.html',
                            controllerAs: 'vm',
                            escapeToClose: false,
                            locals: {
                                data: vm.about.languages,
                                languages: vm.languages
                            }
                        }).then(function (data) {
                            if (data.isEdited == true) {
                                var data1 = {
                                    languages: data.languages
                                };
                                apiService.postAPI(SERVER_PROFILEEDITLANGUAGES, true, data1, function (e) {
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
                                    vm.about.languages = e.result;
                                });
                            }
                        });
                    });
                    break;
                case 'Education':
                    $mdDialog.show({
                        controller: 'EducationDetailController',
                        templateUrl: 'app/main/admin/users/educations-detail.tmpl.html',
                        controllerAs: 'vm',
                        escapeToClose: false,
                        locals: {
                            data: vm.about.educations
                        }
                    }).then(function (data) {
                        if (data.isEdited == true) {
                            var data1 = {
                                educations: data.educations
                            };
                            apiService.postAPI(SERVER_PROFILEEDITEDUCATIONS, true, data1, function (e) {
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
                                vm.about.educations = e.result;
                            });
                        }
                    });
                    break;
                case 'Experience':
                    $mdDialog.show({
                        controller: 'ExperienceDetailController',
                        templateUrl: 'app/main/admin/users/experiences-detail.tmpl.html',
                        controllerAs: 'vm',
                        escapeToClose: false,
                        locals: {
                            data: vm.about.experiences
                        }
                    }).then(function (data) {
                        if (data.isEdited == true) {
                            var data1 = {
                                experiences: data.experiences
                            };
                            apiService.postAPI(SERVER_PROFILEEDITEXPERIENCES, true, data1, function (e) {
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
                                vm.about.experiences = e.result;
                            });
                        }
                    });
                    break;
                case 'Certifications':
                    $mdDialog.show({
                        controller: 'CertificationDetailController',
                        templateUrl: 'app/main/admin/users/certifications-detail.tmpl.html',
                        controllerAs: 'vm',
                        escapeToClose: false,
                        locals: {
                            data: vm.about.certifications
                        }
                    }).then(function (data) {
                        if (data.isEdited == true) {
                            var data1 = {
                                certifications: data.certifications
                            };
                            apiService.postAPI(SERVER_PROFILEEDITCERTIFICATIONS, true, data1, function (e) {
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
                                vm.about.certifications = e.result;
                            });
                        }
                    });
                    break;
                case 'AboutUs' :
                    $mdDialog.show({
                        controller: 'AboutUsController',
                        templateUrl: 'app/main/profile/about/aboutUs.tmpl.html',
                        controllerAs: 'vm',
                        escapeToClose: false,
                        locals: {
                            about: vm.about,
                            countries : vm.countries
                        }
                    }).then(function (data) {
                        if(data!=undefined)
                        {
                            vm.about = data;
                            $mdToast.show({
                                template: '<md-toast><span flex>Updated!</span></md-toast>',
                                position: 'bottom right',
                                hideDelay: 3000
                            });
                        }
                    });
                    break;
            }
        }

        /////// CANCER BUTTON ///////////
        function cancer(item) {
            switch (item) {
                case 'Info':
                    vm.editInfo = false;
                    break;
                case 'Contact':
                    vm.editContact = false;
                    break;
                case 'Summary':
                    vm.editSummary = false;
                    break;
            }
        }

        /////// SAVE BUTTON ///////////
        function save(item) {
            vm.Change = false;
            switch (item) {
                case 'Info':
                    var data = {
                        name: vm.about.name,
                        gender: vm.about.gender,
                        birth: date2String(vm.about.birth),
                        headline :vm.about.headline,
                        country_code:vm.about.profile.country_code,
                        city : vm.about.profile.city,
                        job_position :vm.about.profile.job_position
                    };

                    apiService.postAPI(SERVER_EDITBASICINFO, true, data, function (e) {
                        if (!(e.success == 1)) {
                            $mdToast.show({
                                template: '<md-toast><span flex>Cann\'t update basic info</span></md-toast>',
                                position: 'bottom right',
                                hideDelay: 3000
                            });
                            return;
                        }
                        $rootScope.user.name = data.name;
                        $rootScope.user.birth = data.birth;
                        $rootScope.user.gender = data.gender;
                        $mdToast.show({
                            template: '<md-toast><span flex>Updated</span></md-toast>',
                            position: 'bottom right',
                            hideDelay: 3000
                        });
                    });
                    break;
                case 'Contact':
                    var data={
                        phone :vm.about.profile.phone,
                        email :vm.about.email
                    };
                    apiService.postAPI(SERVER_EDITPROFILECONTACT, true, data, function (e) {
                        if (!(e.success == 1)) {
                            $mdToast.show({
                                template: '<md-toast><span flex>Cann\'t update basic info</span></md-toast>',
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
                    });
                    break;
                case 'Summary':
                    var data={
                        summary :vm.about.profile.summary
                    };
                    apiService.postAPI(SERVER_PROFILEEDITSUMMARY, true, data, function (e) {
                        if (!(e.success == 1)) {
                            $mdToast.show({
                                template: '<md-toast><span flex>Cann\'t update basic info</span></md-toast>',
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
                    });
                    break;
                case 'ShortDescription' :
                    var data ={
                        shortdescription : vm.about.shortdescription
                    };
                    // apiService.postAPI(SERVER_PROFILEEDITSUMMARY, true, data, function (e) {
                    //     if (!(e.success == 1)) {
                    //         $mdToast.show({
                    //             template: '<md-toast><span flex>Cann\'t update</span></md-toast>',
                    //             position: 'bottom right',
                    //             hideDelay: 3000
                    //         });
                    //         return;
                    //     }
                    //     $mdToast.show({
                    //         template: '<md-toast><span flex>Updated</span></md-toast>',
                    //         position: 'bottom right',
                    //         hideDelay: 3000
                    //     });
                    // });
                    // break;
            }
            cancer(item);
        }
    }
})();
