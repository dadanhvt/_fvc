/**
 * Created by Tinti on 8/14/2016.
 */
(function () {
    'use strict';

    angular
        .module('phaojlar.directives')
        .directive('spidersDirective', spidersDirective);

    /* @ngInject */
    function spidersDirective() {
        // Usage:
        //
        // ```html
        // <form name="signup">
        //     <input name="password" type="password" ng-model="user.password" same-password="signup.confirm" />
        //     <input name="confirm" type="password" ng-model="user.confirm" same-password="signup.confirm" />
        // </form>
        // ```
        // Creates:
        //
        // `samePassword` is a directive with the purpose to validate a password input based on the value of another input.
        // When both input values are the same the inputs will be set to valid

        var directive = {
            restrict: 'A',
            link: link
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
            var width, height, canvas, ctx, points, target, animateHeader = true;

            // Main
            init();
            $(window).resize(function(){
                init();
            });
            function init(){
                $('#indexspider').css({'min-height': (window.innerHeight - 50)});
                $('#spiders').css({'min-height': (window.innerHeight - 50)});
            }

        }
    }
})();
