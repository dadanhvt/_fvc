/**
 * Created by Tinti on 8/14/2016.
 */
(function () {
    'use strict';

    angular
        .module('phaojlar.directives')
        .directive('fbFanpage', fbFanpage);

    /* @ngInject */
    function fbFanpage() {
        function createHTML() {
            return '<div class="fb-page" data-href="https://www.facebook.com/francovietcareer/?fref=ts" data-tabs="timeline" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/francovietcareer/?fref=ts" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/francovietcareer/?fref=ts">Franco-Viet Career</a></blockquote></div>';
        }

        return {
            restrict: 'A',
            scope: {},
            link: function postLink(scope, elem, attrs) {
                attrs.$observe('pageHref', function (newValue) {
                    elem.html(createHTML());
                    FB.XFBML.parse(elem[0]);
                });
            }
        };
    }
})();
