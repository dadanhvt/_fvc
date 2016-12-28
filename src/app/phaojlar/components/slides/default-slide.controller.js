(function() {
    'use strict';

    angular
        .module('phaojlar.components')
        .controller('DefaultSlideController', DefaultSlideController);

    /* @ngInject */
    function DefaultSlideController() {
        var vm = this;
        vm.slides = [
            {url: 'assets/images/slides/slide1.jpg'},
            {url: 'assets/images/slides/slide2.jpg'},
            {url: 'assets/images/slides/slide3.jpg'}]
    }
})();
