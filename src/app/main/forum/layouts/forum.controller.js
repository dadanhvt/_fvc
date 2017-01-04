(function() {
    'use strict';

    angular
        .module('app.main.index')
        .controller('ForumLayoutController', ForumLayoutController);

    /* @ngInject */
    function ForumLayoutController($state) {
        var vm = this;
        init();
        function init() {
            if($state.current.name == 'phaojlar.default.forum'){
                $state.go('phaojlar.default.forum.index');
            }
        }
    }
})();
