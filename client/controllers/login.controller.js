'use strict';

angular.module('redisGame')
    .controller('loginController', loginController);

loginController.$inject = ['$scope', '$http', 'authService', 'Session'];

function loginController($scope, $http, authService, Session) {
    // $scope.session = new Session();
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
            authService.setSessionId(sess.sessionId);
            console.dir(authService.getSessionId());
        }, function(err) {
            if (err && err.data && err.data.error) {
                console.error('[loginController] saveForm() - ' + err.data.error);
            }
        });
    };
}
