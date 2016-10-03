'use strict';

angular.module('redisGame')
    .factory('Session', sessionService);

sessionService.$inject = ['$resource'];

function sessionService($resource) {
    return $resource('/api/session/:sessionId', {sessionId: '@sessionId'});
}
