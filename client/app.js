(function() {
    'use strict';

    var app = angular.module('game', ['ngRoute']);

    // Routes
    app.config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/game', {
                controller: 'gameController',
                controllerAs: 'vm',
                //templateUrl: '/partial/view/gamepiece.html'
                templateUrl: 'gamepiece.html'
            })
            .when('/', {
                template: '<div>Nothing to see here</div>',
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    });

    // Controller
    app.controller('gameController', GameController);
    GameController.$inject = ['$scope', '$interval'];

    function GameController($scope, $interval) {
        var iconlist = [
            {name: 'fa-female', score: '1'},
            {name: 'fa-frown-o', score: '-1'},
            {name: 'fa-github-alt', score: '0'},
            {name: 'fa-ship', score: '1'},
            {name: 'fa-skyatlas', score: '0'},
            {name: 'fa-slideshare', score: '0'},
            {name: 'fa-slack', score: '0'},
            {name: 'fa-subway', score: '0'},
            {name: 'fa-weibo', score: '0'},
            {name: 'fa-tripadvisor', score: '0'},
            {name: 'fa-android', score: '0'},
            {name: 'fa-500px', score: '0'},
            {name: 'fa-birthday-cake', score: '3'},
            {name: 'fa-bomb', score: '-5'},
            {name: 'fa-gift', score: '2'},
            {name: 'fa-drupal', score: '0'}
        ];

        $scope.message = 'Hello Controller';

        var getRandomInt = function(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        };

        /* jshint -W080 */
        var spinner = undefined;

        $scope.startSpin = function() {
            spinner = $interval(function() {
                $scope.currentScore = '';
                var newRnd = getRandomInt(0, iconlist.length);
                $scope.currentPrize = iconlist[newRnd];
                $scope.prizeIconClass = 'fa ' + $scope.currentPrize.name + ' fa-5x';
            }, 150);
        };

        $scope.stopSpin = function() {
            if (angular.isDefined(spinner)) {
                $interval.cancel(spinner);
                spinner = undefined;
                $scope.currentScore = $scope.currentPrize.score;
                console.log('Submitting score: ' + $scope.currentPrize.score);
            }
        };

        $scope.isSpinning = function() {
            return angular.isDefined(spinner);
        };

        var init = function() {
            var currentPrize = iconlist[0];
            console.log(currentPrize);
            $scope.prizeIconClass = 'fa ' + currentPrize.name + ' fa-5x';
        };

        init();
    }

})();
