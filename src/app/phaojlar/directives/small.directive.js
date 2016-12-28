/**
 * Created by Tinti on 10/31/2016.
 */
/**
 * Created by Tinti on 8/14/2016.
 */
(function () {
    'use strict';

    angular
        .module('phaojlar.directives')
        .directive('hideScroll', hideScroll)
        .directive('fileModel', fileModel);

    /* @ngInject */
    function hideScroll($timeout) {
        var directive = {
            restrict: 'A',
            link: link
        };
        return directive;
        function link(scope, element) {
            var nav = element;
            var posTop = nav.position().top;
            $('#body-scroll').scroll(function () {
                var y = $(this).scrollTop();
                if (y > posTop) { $(element[0]).css({ display: 'none'}); }
                else {$(element[0]).css({ display: 'flex'}); }
            });
        }
    }
    function fileModel($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }
})();
