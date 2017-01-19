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
            }
        ];
    }
})();
