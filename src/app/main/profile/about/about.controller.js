/**
 * Created by kinhcan on 10/10/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.main.profile')
        .controller('AboutController', AboutController);
    function AboutController($mdConstant, Notification, $mdToast, apiService, $rootScope, $stateParams) {
        var vm = this;
        vm.checkdisable = true;
        vm.edit = edit;
        vm.cancer = cancer;
        vm.save = save;
        vm.DisableCancer = DisableCancer;
        vm.citySearch = citySearch;
        vm.addEducation = addEducation;
        vm.addExperience = addExperience;
        vm.addCertifications = addCertifications;

        init();
        function init() {
            //get basic about
            vm.aboutUser = $stateParams.userId;
            apiService.getAPI(SERVER_GETPROFILEABOUT + "?id=" + vm.aboutUser, true, function (e) {
                if (!(e.success == 1)) {
                    return;
                }
                vm.about = e.result;
                if(vm.about.birth != "" && vm.about.birth != null){
                    vm.about.birth = date2String(vm.about.birth);
                }else{
                    vm.about.birth = undefined;
                }
                if(vm.about.certifications.date_from != "" && vm.about.certifications.date_from != null){
                    vm.about.certifications.date_from = string2Date(vm.about.certifications.date_from);
                }else{
                    vm.about.certifications.date_from = undefined;
                }
                vm.about.profile.countries = [];
                if(vm.about.profile.country_code != '' && vm.about.profile.country_code != null)
                vm.about.profile.countries.push(vm.about.profile.country_f);
                if(vm.about.profile.nationality != '' && vm.about.profile.nationality != null && vm.about.profile.nationality != vm.about.profile.country_code)
                    vm.about.profile.countries.push(vm.about.profile.nationality_f);
                vm.about.profile.cities = [];
                if(vm.about.profile.city != '' && vm.about.profile.city != null)
                    vm.about.profile.cities.push(vm.about.profile.city_f);
                if(vm.about.educations == null || vm.about.educations == "")
                    vm.about.educations.push({
                        school_name :"",
                        grade : "",
                        study_from :"",
                        feild:""
                    });
                if( vm.about.experiences == null ||  vm.about.experiences == "")
                    vm.about.experiences.push({
                        company_name:"",
                        title : "",
                        location:"",
                        work_from:""
                    });
                if(vm.about.certifications == null || vm.about.certifications == "")
                    vm.about.certifications.push({
                        name :"",
                        authority : "",
                        date_from :"",
                        unexpire:""
                    });

            });
        }

        function citySearch() {
            apiService.getAPI(SERVER_GETCITIESINCOUNTRY + "?code=" + vm.about.profile.country_code, false, function (e) {
                if (!(e.success == 1)) {
                    return;
                }
                vm.about.profile.cities = e.result;
            });
        }
        ///// DisableCancer When change ////
        function DisableCancer() {
            vm.Change = true;
        }

        function addEducation(index) {
            vm.about.educations[index].isEdit = true;
            vm.edited = true;
            if(index == vm.about.educations.length - 1){
                var  data = {
                    school_name :"",
                    grade : "",
                    study_from :"",
                    feild:""
                };
                vm.about.educations.push(data);
            }

        }
        function addCertifications(index) {
            vm.about.certifications[index].isEdit = true;
            vm.edited = true;
            if(index == vm.about.certifications.length - 1){
                var  data = {
                    name :"",
                    authority : "",
                    date_from :"",
                    unexpire:""
                }
                vm.about.certifications.push(data);
            }
        }

        function addExperience(index) {
            vm.about.experiences[index].isEdit = true;
            vm.edited = true;
            if(index == vm.about.experiences.length - 1){
                var  data = {
                    company_name:"",
                    title : "",
                    location:"",
                    work_from:""
                };
                vm.about.experiences.push(data);
            }
        }

        function deletearray() {
            vm.about.experiences.slice(1,data);
        }

        /////// EDIT BUTTON ///////////

        function edit(item) {
            switch (item) {
                case 'Info':
                    apiService.getAPI(SERVER_GETCOUNTRIES, false, function (e) {
                        if (!(e.success == 1)) {
                            return;
                        }
                        vm.about.profile.countries = e.result;
                    });
                    vm.editInfo = true;
                    break;
                case 'Contact':
                    vm.editContact = true;
                    break;
                case 'Summary':
                    vm.editSummary = true;
                    break;
                case 'Education':
                    vm.editEducation = true;
                    break;
                case 'Experience':
                    vm.editExperience = true;
                    break;
                case 'Skill':
                    vm.editSkill = true;
                    break;
                case 'Certifications':
                    vm.editCertifications = true;
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
                case 'Education':
                    vm.editEducation = false;
                    break;
                case 'Experience':
                    vm.editExperience = false;
                    break;
                case 'Skill':
                    vm.editSkill = false;
                    break;
                case 'Certifications':
                    vm.editCertifications = false;
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
                        birth: date2String(vm.about.birth)
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
                            template: '<md-toast><span flex>Updated basic info</span></md-toast>',
                            position: 'bottom right',
                            hideDelay: 3000
                        });
                    });
                    break;
                case 'Contact':
                    Notification.success('Contact Information has updated Successfully!');
                    break;
                case 'Summary':
                    Notification.success('Summary has updated Successfully!');
                    break;
                case 'Education':
                    Notification.success('Education has updated Successfully!');
                    break;
                case 'Experience':
                    Notification.success('Experience has updated Successfully!');
                    break;
                case 'Skill':
                    Notification.success('Skill has updated Successfully!');
                    break;
                case 'Certifications':
                    Notification.success('Certifications has updated Successfully!');
                    break;
            }
            cancer(item);
        }


        // USER INFORMATION
        // vm.FullName = "Mallinda Hollaway";
        // vm.Gender = 0;
        // vm.Birthday = "6/6/1996";
        // vm.MobilePhone = "1234.567.890";
        // vm.EmailAddress = "email@email.com";
        // vm.Facebook = "fb/kinhcan";
        // vm.Summary = "Sed eu est vulputate, fringilla ligula ac, maximus arcu. Donec sed felis vel magna mattis ornare " +
        //     "ut non turpis. Sed id arcu elit. Sed nec sagittis tortor. Mauris ante urna, ornare sit amet mollis " +
        //     "eu, aliquet ac ligula. Nullam dolor metus, suscipit ac imperdiet nec, consectetur sed ex. Sed cursus porttitor leo.";
        // vm.School = "vulputate, fringilla ligula ac, maximus arcu.";
        // vm.Grade = "10";
        // //DatesAtended
        // vm.Field = "fringilla ligula ac, maximus arcu";
        // vm.Company = "Company Company";
        // vm.Title = "Donec sed felis vel magna mattis ";
        // vm.Location = "25 Ly Thuong Kiet HCM";
        // //TimePeriod
        // vm.CertificationName = "Athena";
        // vm.CertificationAuthority = "Athena Authority";
        // //Dates
        // vm.LicenseNumber = "123456";
        // vm.keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];
        // vm.tags = ['Web Design', 'Dota 2']; //Skill
    }
})();
