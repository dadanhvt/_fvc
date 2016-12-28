/**
 * Created by Tinti on 8/14/2016.
 */
(function () {
    'use strict';

    angular
        .module('phaojlar.directives')
        .directive('slideDirective', slideDirective);

    /* @ngInject */
    function slideDirective($timeout) {
        var directive = {
            restrict: 'A',
            scope: { slideSwipe: '&slideSwipe' },
            link: link
        };
        return directive;

        function link(scope, element) {
            var mainInterval;
            $timeout(function(){
                init();
                mainInterval = setInterval(function () {
                    moveRight();
                },10000);
            });
            scope.moveLeft = moveLeft;
            scope.moveRight = moveRight;
            var slideCount;
            var slideWidth;
            var slideHeight;
            var sliderUlWidth;
            function init(){
                slideCount = element[0].children[2].children.length;
                slideWidth = element[0].offsetWidth;
                $(element[0]).children(0).children('ul li').css({ width: slideWidth});
                sliderUlWidth = slideCount * slideWidth;
                slideHeight = element[0].children[2].children[0].children[0].height;
                var timeoutHandler = setInterval(function () {
                    slideHeight = element[0].children[2].children[0].children[0].height;
                    if(slideHeight != 0) {
                        $(element[0]).css({height: slideHeight });
                        $(element[0]).children('ul').css({ width: sliderUlWidth, height: slideHeight, marginLeft: - slideWidth });
                        clearInterval(timeoutHandler);
                    }
                },200);
                $(element[0]).children('ul li:last-child').prependTo('#slider ul');
            }
            $(window).resize(function(){
                init();
            });
            function moveLeft() {
                $('#slider ul').animate({
                    left: + slideWidth
                }, 500, function () {
                    $('#slider ul li:last-child').prependTo('#slider ul');
                    $('#slider ul').css('left', '');
                });
            };

            function moveRight() {
                $('#slider ul').animate({
                    left: - slideWidth
                }, 500, function () {
                    $('#slider ul li:first-child').appendTo('#slider ul');
                    $('#slider ul').css('left', '');
                });
            };

            $('a.control_prev').click(function () {
                moveLeft();
            });

            $('a.control_next').click(function () {
                moveRight();
            });

        }
    }
})();
