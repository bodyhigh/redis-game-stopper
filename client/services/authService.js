'use strict';

angular.module('redisGame')
    .factory('authService', authService);

authService.$inject = ['$cookies'];

function authService($cookies) {
    var sessionIdKey = 'redisGameSessionId';
    var sessionCookie;

    var auth = {
        isLoggedIn: isLoggedIn,
        getSessionId: getSessionId,
        setSessionId: setSessionId,
    };

    refreshCookieRef();
    return auth;

    function isLoggedIn() {
        return sessionCookie !== undefined;
    }

    function refreshCookieRef() {
        sessionCookie = getSessionId();
    }

    function getSessionId() {
        return $cookies.getObject(sessionIdKey);
    }

    function setSessionId(sessionData) {
        $cookies.putObject(sessionIdKey, sessionData);
        refreshCookieRef();
    }
}
