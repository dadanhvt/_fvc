/**
 * Created by Tinti on 9/28/2016.
 */

(function() {
    'use strict';

    angular
        .module('phaojlar.filters')
        .filter('plaintext', plaintext);

    /* @ngInject */
    function plaintext() {
        return function(text) {
            return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
        };
    }
})();
