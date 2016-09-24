'use strict';

angular.module('redisGame')
    .controller('loginController', loginController);

loginController.$inject = ['$scope'];

function loginController($scope) {
    $scope.saveForm = function() {
        console.log('Save the form');
    };
}
