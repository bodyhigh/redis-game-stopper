'use strict';

angular.module('redisGame')
    .controller('loginController', loginController);

loginController.$inject = ['$scope', '$http', 'authService', 'Session', '$location'];

function loginController($scope, $http, authService, Session, $location) {
    $scope.session = {};

    $scope.saveForm = function(session) {
        // var data = {'name': $scope.session.name, 'password': $scope.session.password};
        // $http.post('/api/session', $scope.session)
        //     .then(function(res) {
        //         console.log('success');
        //         console.log(res);
        //     }, function(res) {
        //         // failed
        //         console.log('failed');
        //         console.log(res);
        //     });

        ///////////////////////////////////////////////////////
        var results = Session.save({}, $scope.session, function(sess) {
            authService.setSession(sess);
            // console.dir(authService.getSessionId());
            $location.path('/');
        }, function(err) {
            if (err && err.data && err.data.error) {
                console.error('[loginController] saveForm() - ' + err.data.error);
            }
        });
    };
}
