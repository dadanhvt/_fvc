(function ()
{
    'use strict';

    angular
        .module('app.main.mail', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        // State
        $stateProvider.state('phaojlar.default.mail', {
            url      : '/mail',
            templateUrl: 'app/main/mail/mail.html',
            controller : 'MailController as vm',
            resolve: {
                access: ["Auth", function(Auth) {
                    return Auth.isAuthenticated();
                }]
            }
        });

    }
})();
