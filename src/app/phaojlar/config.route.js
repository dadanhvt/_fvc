(function () {
    'use strict';

    angular
        .module('phaojlar')
        .config(routeConfig);

    /* @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('phaojlar', {
                abstract: true,
                templateUrl: 'app/phaojlar/layouts/default/default-layout.tmpl.html',
                controller: 'DefaultLayoutController',
                controllerAs: 'DefaultLayoutController',
                resolve: {
                    config: function(apiService) {
                        return undefined;
                        // return apiService.getAPI(SERVER_GETCONFIG, false, function (e) {
                        //     var isSuccess = e.success == 1;
                        //     if (!isSuccess) {
                        //         return;
                        //     }
                        //     return e.config;
                        // });
                    }
                }
            })
            .state('phaojlar.default', {
                abstract: true,
                views: {
                    footer: {
                        templateUrl: 'app/phaojlar/components/footers/default-footer.tmpl.html',
                        controller: 'DefaultFooterController',
                        controllerAs: 'vm'
                    },
                    toolbar: {
                        templateUrl: 'app/phaojlar/components/toolbars/default-toolbar.tmpl.html',
                        controller: 'DefaultToolbarController',
                        controllerAs: 'vm'
                    },
                    content: {
                        template: '<div ui-view class="padding-0" style="position: relative;"></div>'
                    },
                    navigation:{
                        templateUrl: 'app/phaojlar/components/navigations/default-navigation.tmpl.html',
                        controller: 'DefaultNavController',
                        controllerAs: 'vm'
                    }
                }
            }).state('phaojlar.slide', {
            abstract: true,
            views: {
                footer: {
                    templateUrl: 'app/phaojlar/components/footers/default-footer.tmpl.html',
                    controller: 'DefaultFooterController',
                    controllerAs: 'vm'
                },
                toolbar: {
                    templateUrl: 'app/phaojlar/components/toolbars/default-toolbar.tmpl.html',
                    controller: 'DefaultToolbarController',
                    controllerAs: 'vm'
                },
                content: {
                    template: '<div ui-view class="padding-0"></div>'
                },
                slide: {
                    templateUrl: 'app/phaojlar/components/slides/default-slide.tmpl.html',
                    controller: 'DefaultSlideController',
                    controllerAs: 'vm'
                },
                navigation:{
                    templateUrl: 'app/phaojlar/components/navigations/default-navigation.tmpl.html',
                    controller: 'DefaultNavController',
                    controllerAs: 'vm'
                }
            }
        }).state('phaojlar.landing', {
            abstract: true,
            views: {
                footer: {
                    templateUrl: 'app/phaojlar/components/footers/default-footer.tmpl.html',
                    controller: 'DefaultFooterController',
                    controllerAs: 'vm'
                },
                toolbar: {
                    templateUrl: 'app/phaojlar/components/toolbars/default-toolbar.tmpl.html',
                    controller: 'DefaultToolbarController',
                    controllerAs: 'vm'
                },
                content: {
                    template: '<div ui-view class="padding-0"></div>'
                },
                slide: {
                    templateUrl: 'app/phaojlar/components/slides/spider-slide.tmpl.html',
                    controller: 'SpiderSlideController',
                    controllerAs: 'vm'
                },
                navigation:{
                    templateUrl: 'app/phaojlar/components/navigations/default-navigation.tmpl.html',
                    controller: 'DefaultNavController',
                    controllerAs: 'vm'
                }
            }
        }).state('phaojlar.menu', {
            abstract: true,
            views: {
                footer: {
                    templateUrl: 'app/phaojlar/components/footers/default-footer.tmpl.html',
                    controller: 'DefaultFooterController',
                    controllerAs: 'vm'
                },
                toolbar: {
                    templateUrl: 'app/phaojlar/components/toolbars/default-toolbar.tmpl.html',
                    controller: 'DefaultToolbarController',
                    controllerAs: 'vm'
                },
                content: {
                    templateUrl: 'app/phaojlar/layouts/default/default-menu.tmpl.html',
                    controller: 'DefaultMenuLayoutController',
                    controllerAs: 'vm'
                },
                navigation:{
                    templateUrl: 'app/phaojlar/components/navigations/default-navigation.tmpl.html',
                    controller: 'DefaultNavController',
                    controllerAs: 'vm'
                }
            }
        }).state('phaojlar.menu.default', {
            abstract: true,
            views: {
                content: {
                    template: '<div ui-view class="padding-0"></div>'
                },
                menubar: {
                    templateUrl: 'app/phaojlar/components/menu/default-menu.tmpl.html',
                    controller: 'DefaultMenuController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                access: ["Auth", function (Auth) {
                    return Auth.hasRole('AD');
                }]
            }
        })
    }
})();
