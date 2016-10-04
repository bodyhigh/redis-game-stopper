'use strict';

angular.module('redisGame', [
    // 'redisGame.login',
    'ngResource',
    'ngCookies',
    'ngRoute'])
    // Routes
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/game', {
                controller: 'gameController',
                controllerAs: 'vm',
                templateUrl: 'partial/views/gamepiece.html'
                // templateUrl: 'gamepiece.html'
            })
            .when('/', {
                template: '<div>Nothing to see here</div>',
            })
            .when('/login', {
                controller: 'loginController',
                controllerAs: 'vm',
                templateUrl: 'partial/views/login.html'
            })
            .when('/logout', {
                        name: 'logout',
                        referrer: 'logout',
                        template: '',
                        controller: function($location, $route, authService) {
                            var referrer = $route.current.params.referrer || $route.current.referrer || '/';
                            authService.logout();
                            $location.path('/');
                        }
                    })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    });
