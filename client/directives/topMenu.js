'use strict';

angular.module('redisGame')
    .controller('topMenuController', function($scope, authService) {
        $scope.auth = authService;
    })
    .directive('topMenu', function() {
        return {
            controller: 'topMenuController',
            controllerAs: 'vm',
            restrict: 'E',
            templateUrl: 'partial/views/topMenu.html'
        };
    });
