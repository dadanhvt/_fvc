/**
 * Created by kinhcan on 11/20/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.main.admin')
        .controller('UsersList', UsersList);

    /* @ngInject */
    function UsersList($mdDialog, $mdToast, apiService, $location, $anchorScroll, $http, Upload, countries, $q, $timeout, industries, languages) {
        var vm = this;
        vm.deleteUser = deleteUser;
        vm.detailLanguage = detailLanguage;
        vm.detailEducation = detailEducation;
        vm.detailCertification = detailCertification;
        vm.detailExperience = detailExperience;
        vm.saveUser = saveUser;
        vm.addUser = addUser;
        vm.getData = getData;
        vm.changeSearchText = changeSearchText;
        vm.users = [];
        vm.usersDelete = [];
        function sortNationalities(a) {

        }
        vm.uploadCV = uploadCV;
        vm.onChangeFilter = onChangeFilter;
        vm.citySearch = citySearch;
        vm.nameOfLang = nameOfLang;

        // auto complete
        // vm.countries = reloadCountries();
        // vm.countrySearch = countrySearch;
        // vm.countryChange = countryChange;
        // vm.cityChange = cityChange;
        // vm.citySearch = citySearch;
        // vm.countryTextChange = countryTextChange;
        // vm.cityTextChange = cityTextChange;

        init();
        function init() {
            vm.job_functions = CONST_JOB_FUNCTION;
            vm.roles = CONST_ROLE;
            vm.languages = languages.result;
            vm.industries = cattegoriesBind(industries.result);
            vm.edited = false;
            vm.query = {
                order: 'created_at',
                search: '',
                searchBy: 'name',
                role: '',
                limit: LIMIT_PAGE,
                page: 1
            };
            getData();
        }


        function saveUser() {
            var userAdd = vm.users.data.filter(function (user) {
                return user.isEdit == true && user.name != "";
            });
            userAdd = userAdd.map(function (user) {
                return {
                    id: user.id?user.id:0,
                    birth: user.birth != null ? date2String(user.birth) : null,
                    certifications: user.certifications,
                    credit: user.credit,
                    educations: user.educations,
                    email: user.email,
                    experiences: user.experiences,
                    f_credit: user.f_credit,
                    gender: user.gender,
                    headline: user.headline,
                    languages: user.languages,
                    name: user.name,
                    profile: {
                        phone: user.profile.phone,
                        summary: user.profile.summary,
                        industry_id: user.profile.industry_id,
                        city: user.profile.city,
                        country_code: user.profile.country_code,
                        nationality: user.profile.nationality,
                        job_position: user.profile.job_position,
                        cv_url: user.profile.cv_url
                    },
                    role: user.role,
                    password: user.password
                };
            });
            var data = {
                usersAdd: userAdd,
                usersDelete: vm.usersDelete
            };
            apiService.postAPI(SERVER_AUPDATEUSERS, true, data, function (e) {
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
                getDataAPI();
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
            if (vm.edited) {
                var confirm = $mdDialog.confirm()
                    .title('Would you like to save new data?')
                    .cancel('No')
                    .ok('Save');
                $mdDialog.show(confirm).then(function () {
                    saveData();
                    getDataAPI();
                }, function () {
                    getDataAPI();
                });
            } else {
                getDataAPI();
            }
        }

        function getDataAPI() {
            vm.edited = false;
            apiService.getAPI(SERVER_AGETPROFILES + "?search=" + vm.query.search + "&searchBy=" + vm.query.searchBy + "&order=" + vm.query.order + "&role=" + vm.query.role + "&limit=" + vm.query.limit + "&page=" + vm.query.page, true, function (e) {
                if (!(e.success == 1)) {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Error')
                            .textContent('Cannot load data! please try again.')
                            .ok('OK!')
                    );
                    return;
                }
                vm.users = e.result;
                angular.forEach(vm.users.data, function (value, key) {
                    if (value.birth != null){
                        value.birth = string2Date(value.birth);
                    }
                    value.profile.cities = [];
                    if (value.profile.city != null && value.profile.city != '') {
                        value.profile.city = parseInt(value.profile.city);
                    }
                    if (value.profile.city_f != null) {
                        value.profile.cities.push(value.profile.city_f);
                    }
                });
                var data_tmpl = {
                    birth: null,
                    certifications: [],
                    credit: 0,
                    educations: [],
                    email: "",
                    experiences: [],
                    f_credit: 0,
                    gender: 1,
                    headline: "",
                    languages: [],
                    name: "",
                    profile: {
                        phone: "",
                        summary: "",
                        industry_id: null,
                        city: null,
                        city_f: [],
                        country_code: "VNM",
                        country_f: {code: "VNM", name: "Vietnam", continent: "Asia"},
                        nationality: "VNM",
                        nationality_f: {code: "VNM", name: "Vietnam", continent: "Asia"},
                        job_position: "",
                        cv_url: ""
                    },
                    role: "US1",
                    user_name: ""
                };
                vm.users.data.push(data_tmpl);
            });
        }

        function deleteUser(user) {
            var confirm = $mdDialog.confirm()
                .title('Would you like to delete user?')
                .cancel('Cancel')
                .ok('Delete');
            $mdDialog.show(confirm).then(function () {
                vm.edited = true;
                vm.users.data.splice(vm.users.data.indexOf(user), 1);
                if (user.id != undefined) vm.usersDelete.push(user.id);
                $mdToast.show({
                    template: '<md-toast><span flex>Deleted</span></md-toast>',
                    position: 'bottom right',
                    hideDelay: 3000
                });
            });
        }

        function detailLanguage(user) {
            $mdDialog.show({
                controller: 'LanguageDetailController',
                templateUrl: 'app/main/admin/users/languages-detail.tmpl.html',
                controllerAs: 'vm',
                escapeToClose: false,
                locals: {
                    data: user.languages,
                    languages: vm.languages
                }
            }).then(function (data) {
                if (data.isEdited == true) {
                    user.isEdit = true;
                    vm.edited = true;
                    user.languages = data.languages;
                }
            });
        }

        function detailEducation(user) {
            $mdDialog.show({
                controller: 'EducationDetailController',
                templateUrl: 'app/main/admin/users/educations-detail.tmpl.html',
                controllerAs: 'vm',
                escapeToClose: false,
                locals: {
                    data: user.educations
                }
            }).then(function (data) {
                if (data.isEdited == true) {
                    user.isEdit = true;
                    vm.edited = true;
                    user.educations = data.educations;
                }
            });
        }

        function detailCertification(user) {
            $mdDialog.show({
                controller: 'CertificationDetailController',
                templateUrl: 'app/main/admin/users/certifications-detail.tmpl.html',
                controllerAs: 'vm',
                escapeToClose: false,
                locals: {
                    data: user.certifications
                }
            }).then(function (data) {
                if (data.isEdited == true) {
                    user.isEdit = true;
                    vm.edited = true;
                    user.certifications = data.certifications;
                }
            });
        }

        function detailExperience(user) {
            $mdDialog.show({
                controller: 'ExperienceDetailController',
                templateUrl: 'app/main/admin/users/experiences-detail.tmpl.html',
                controllerAs: 'vm',
                escapeToClose: false,
                locals: {
                    data: user.experiences
                }
            }).then(function (data) {
                if (data.isEdited == true) {
                    user.isEdit = true;
                    vm.edited = true;
                    user.experiences = data.experiences;
                }
            });
        }
        function uploadCV(index, user, file) {
            if(file !=null){
                var fd = new FormData();
                fd.append('file', file);
                fd.append('id', user.id);
                $http.post(SERVER_EDITCV, fd, {
                    transformRequest: angular.identity,
                    withCredentials: true,
                    headers: {'Content-Type': undefined}
                })
                    .success(function (e) {
                        addUser(index);
                        $mdToast.show({
                            template: '<md-toast><span flex>Upload success!</span></md-toast>',
                            position: 'bottom right',
                            hideDelay: 3000
                        });
                        user.profile.cv_url = e.result;
                    })

                    .error(function () {
                        $mdToast.show({
                            template: '<md-toast><span flex>Error! Please try again.</span></md-toast>',
                            position: 'bottom right',
                            hideDelay: 3000
                        });
                    });
            }
        }

        function addUser(index) {
            vm.users.data[index].isEdit = true;
            vm.edited = true;
            if (index == vm.users.data.length - 1) {
                var data_tmpl = {
                    birth: null,
                    certifications: [],
                    credit: 0,
                    educations: [],
                    email: "",
                    experiences: [],
                    f_credit: 0,
                    gender: 1,
                    headline: "",
                    languages: [],
                    name: "",
                    profile: {
                        phone: "",
                        summary: "",
                        industry_id: null,
                        city: null,
                        city_f: [],
                        country_code: "VNM",
                        country_f: {code: "VNM", name: "Vietnam", continent: "Asia"},
                        nationality: "VNM",
                        nationality_f: {code: "VNM", name: "Vietnam", continent: "Asia"},
                        job_position: "",
                        cv_url: ""
                    },
                    role: "US1",
                    user_name: ""
                };
                vm.users.data.push(data_tmpl);
                $location.hash('user-list-go-bottom');
                $anchorScroll();
            }
        }

        function onChangeFilter(order) {
            vm.query.order = order;
            vm.query.page = 1;
            getData();
        }

        function citySearch(user) {
            apiService.getAPI(SERVER_GETCITIESINCOUNTRY + "?code=" + user.profile.country_code, false, function (e) {
                if (!(e.success == 1)) {
                    return;
                }
                user.profile.cities = e.result;
            });
        }

        function nameOfLang(id) {
            if (id) {
                var results = vm.languages.filter(function (lang) {
                    return lang.id == id;
                });
                return results[0].name;
            }
            return null;
        }

        // auto complete
        // function reloadCountries() {
        //     var _countries = countries.result;
        //
        //     return _countries.map(function (country) {
        //         return {
        //             value: country.name.toLowerCase(),
        //             code: country.code,
        //             name: country.name
        //         };
        //     });
        // }

        // function countrySearch(query) {
        //     var results = query ? vm.countries.filter(createFilterFor(query)) : vm.countries;
        //     return results;
        // }

        // function citySearch(user, query) {
        //     if(user.profile.cities.length <2 || user.profile.cities.length == 0 || user.profile.cities[0].country_code != user.profile.country_code){
        //         var deferred = $q.defer();
        //         $http({
        //             method: 'GET',
        //             url: SERVER_GETCITIESINCOUNTRY+"?code="+user.profile.country_code,
        //             withCredentials: true,
        //             headers: {
        //                 'Content-Type': 'text/plain'
        //             },
        //             timeout: CONST_SERVER_TIMEOUT
        //         }).success(function (data) {
        //             user.profile.cities = data.result;
        //             user.profile.cities =  user.profile.cities.map(function (city) {
        //                 return {
        //                     value: city.name.toLowerCase(),
        //                     id: city.id,
        //                     name: city.name,
        //                     country_code: city.country_code
        //                 };
        //             });
        //             deferred.resolve(data.result);
        //         }).error(function () {
        //         });
        //         return deferred.promise;
        //     }
        //     var results = query ? user.profile.cities.filter(createFilterFor(query)) : user.profile.cities;
        //     return results;
        //
        // }

        // function countryChange(user, item) {
        //     if (item) {
        //         user.isEdit = true;
        //         vm.edited = true;
        //         user.profile.country_code = item.code;
        //         user.profile.country_f = item;
        //         user.profile.citySearch = "";
        //         user.profile.city_f = null;
        //         user.profile.cities = [];
        //     }
        // }

        // function cityChange(user, item) {
        //     if (item){
        //         user.isEdit = true;
        //         vm.edited = true;
        //         user.profile.city = item.id;
        //         user.profile.city_f = item;
        //     }
        // }

        // function countryTextChange(user) {
        //     user.isEdit = true;
        //     vm.edited = true;
        //     user.profile.country_code = null;
        //     user.profile.country_f = null;
        // }
        // function cityTextChange(user) {
        //     user.isEdit = true;
        //     vm.edited = true;
        //     user.profile.city = null;
        //     user.profile.city_f = null;
        // }

        // function createFilterFor(query) {
        //     var lowercaseQuery = angular.lowercase(query);
        //
        //     return function filterFn(state) {
        //         return (state.value.indexOf(lowercaseQuery) === 0);
        //     };
        //
        // }
    }
})();
