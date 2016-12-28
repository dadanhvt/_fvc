/**
 * Created by DucLT on 11/25/2016 AD.
 */
(function () {
    'use strict';

    angular
        .module('app.main.profile')
        .controller('MessengerController', MessengerController);
    function MessengerController($scope ,$location, $anchorScroll) {
        var vm = this;
        vm.inbox = [];
        vm.Postcmt = Postcmt;
        vm.getMessage = getMessage;
        init();
        function init() {
            vm.testtext = "asd The titles of Washed Out's breakthrough song and the first single from Paracosm share the two The titles of Washed Out's breakthrough song and the first single from Paracosm share the twoThe titles of Washed Out's breakthrough song and the first single from Paracosm share the two"
            vm.limit=-2;
            vm.checkshow=true;
            vm.posts = [];
            //api get usermsglist
            //vm.messager= e.resullt;
            //getmessage(vm.messager[0].id)
            getMessage(1);
        }

        function Postcmt(comment,index) {
            var time = new Date();
                var cmt = {
                    author:1,
                    time : time,
                    messenger : comment.cmt
                };
                vm.inbox.push(cmt);
                comment.cmt='';
        }
        function getMessage(id) {
            //api getMessage?id=
            //api getprofile?id=
            if(id == 1){
                vm.name = "teo";
                vm.inbox = [
                    {
                        "author":"1",
                        "messenger":"anh oi e sbdfs dsdjfn awd ljknad uiw w b cadasd io saudh  sauhd",
                        "time":'2016-11-25 12:12:12'
                    },
                    {
                        "author":"2",
                        "messenger":"sdf sdf sdf qeq ewq df jsdfn iqwe jqwen asd ",
                        "time":'2016-12-6'
                    }];

            vm.profile = [
                {
                    id:1,
                    avatar :"../../../../assets/images/user/avatar-1.png",
                    name :"teo",
                    connection :'2000',
                    job:'doctor'
                }
            ]}
            else{
                vm.name = "ti";
                vm.inbox = [
                    {
                        "author":"1",
                        messenger:"anh oi",
                        time:'2016-11-25 12:12:12'
                    },
                    {
                        "author":"1",
                        messenger:"anh oi",
                        time:'2016-11-20'
                    },
                    {
                        "author":"2",
                        messenger:"anh oi",
                        time:'2016-11-20'
                    }
                ];
                vm.profile = [

                    {
                        id:2,
                        avatar :"../../../../assets/images/user/avatar-4.png",
                        name :"ti",
                        connection :'2000012',
                        job:'sdfsh'
                    }
                ]
            }

        }
        $scope.gotoBottom = function() {

            // set the location.hash to the id of
            // the element you wish to scroll to.
            $location.hash('bottom');

            // call $anchorScroll()
            $anchorScroll();
        };

        vm.messenger = [
            {
                id:1,
                avatar :"../../../../assets/images/user/avatar-1.png",
                name :"teo",
                contentMessenger:"anh oi",
                time:'2016-11-25 12:12:12'
            },
            {
                id:2,
                avatar :"../../../../assets/images/user/avatar-4.png",
                name :"ti",
                contentMessenger:"anh oi",
                time:'2016-11-20'
            }
        ];

    }
})();
