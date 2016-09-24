'use strict';

angular.module('redisGame', [
    // 'redisGame.login',
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
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    });
