/**
 * Created by kinhcan on 10/10/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.main.profile')
        .controller('ConnectionController', ConnectionController);
    function ConnectionController(){
        var vm = this;

        vm.friends=[
            {
                Avartar :"app/main/profile/images/1.jpg",
                username : 'qqqqq'
            },
            {
                Avartar :"app/main/profile/images/2.jpg",
                username : 'aaaaa'
            },
            {
                Avartar :"app/main/profile/images/3.jpg",
                username : 'bbbbb'
            },
            {
                Avartar :"app/main/profile/images/4.jpg",
                username : 'cccccc'
            },
            {
                Avartar :"app/main/profile/images/1.jpg",
                username : 'tien'
            },
            {
                Avartar :"app/main/profile/images/2.jpg",
                username : 'tdat'
            },
            {
                Avartar :"app/main/profile/images/3.jpg",
                username : 'tient'
            },
            {
                Avartar :"app/main/profile/images/4.jpg",
                username : 'dat'
            },
            {
                Avartar :"app/main/profile/images/1.jpg",
                username : 'tiendat1'
            },
            {
                Avartar :"app/main/profile/images/2.jpg",
                username : 'kc1'
            }
        ];
    }
})();
