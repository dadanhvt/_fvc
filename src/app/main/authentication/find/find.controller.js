(function () {
    'use strict';


    angular
        .module('app.main.authentication')
        .controller('FindController', FindController);
    function FindController($q, $timeout, $mdToast, $filter, $mdDialog, apiService) {
        var vm = this;
        var delayTimer;
        vm.changsearchRole = changsearchRole;
        vm.changeSearchFeild = changeSearchFeild;
        vm.changeSearchText = changeSearchText;
        initData();
        createData();
        function initData(){
            vm.query = {
                order: 'name',
                search: '',
                searchBy: 'name',
                role: '',
                //limit: LIMIT_USER_LIST,
                page: 1
            };
            vm.searchBy = 'name';
            vm.searchrole = "";
        }
        function changsearchRole(searchRole){
            vm.query.role = searchRole;
            vm.query.page = 1;
            createData();
        }
        function changeSearchFeild(searchBy){
            vm.query.searchBy = searchBy;
            vm.query.page = 1;
            createData();
        }
        function changeSearchText(search){
            clearTimeout(delayTimer);
            delayTimer = setTimeout(function() {
                vm.query.search = search;
                vm.query.page = 1;
                createData();
            }, 1000);
        }
        function createData() {
        }

        vm.todos = [
            {
                company: "sadasd",
                location: "sdada"
            },
            {
                company: "sadasd",
                location: "sdada"
            },
            {
                company: "sadasd",
                location: "sdada"
            },
            {
                company: "sadasd",
                location: "sdada"
            },
            {
                company: "sadasd",
                location: "sdada"
            },
            {
                company: "sadasd",
                location: "sdada"
            },
            {
                company: "sadasd",
                location: "sdada"
            },
            {
                company: "sadasd",
                location: "sdada"
            }

        ]

        vm.job = [
            {
                job: "teo",
                price: "500$"
            },
            {
                job: "teo",
                price: "500$"
            }

        ]
        vm.company = [
            {
                company: "ti",
                follow: "teo"
            },
            {
                company: "ti",
                follow: "teo"
            }
        ]

        vm.advance = [
            {
                advance: "Advanced People Search",
                item1: "Industy",
                item2: "Location",
                item3: "Nationaliti",
                item4: "keyword"
            }
        ]

        vm.function = [
            {
                item1: "lau nha",
                item2: "giat do",
                item3: "nau com",
                item4: "cho con bu"
            }
        ]
        vm.industy = [
            {
                item1: "dich vu",
                item2: "cong nghiep",
                item3: "nong nghiep"
            }
        ]
        vm.city = [
            {
                item1: "Ho chi minh",
                item2: "Ha noi",
                item3: "Buon ma thuot"
            }
        ]
        vm.title = [
            {
                item1: "viec lam tphcm",
                item2: "cong viec Ha noi",
                item3: "tuyen lap trinh vien"
            }
        ]
        vm.school = [
            {
                item1: "Giao thong van tai",
                item2: "Fpt",
                item3: "Hutech"
            }
        ]
        vm.company = [
            {
                item1: "D.aritses",
                item2: "Fsoft",
                item3: "Khoapham"
            }
        ]

        vm.experience = [
            {
                item1: "1 nam",
                item2: "2 nam",
                item3: "3 nam"
            }
        ]
    }
})();
