'use strict';

angular.module('redisGame')
    .factory('authService', authService);

authService.$inject = ['$cookies'];

function authService($cookies) {
    var gameSessionKey = 'redisGameSession';
    var sessionCookie;

    var auth = {
        isLoggedIn: isLoggedIn,
        getSession: getSession,
        setSession: setSession,
        logout: logout,
        getSessionId: getSessionId,
        getName: getName
    };

    refreshCookieRef();
    return auth;

    function isLoggedIn() {
        return sessionCookie !== undefined;
    }

    function refreshCookieRef() {
        sessionCookie = getSession();
    }

    function getSession() {
        return $cookies.getObject(gameSessionKey);
    }

    function setSession(sessionData) {
        $cookies.putObject(gameSessionKey, sessionData);
        refreshCookieRef();
    }

    function logout() {
        $cookies.remove(gameSessionKey);
        refreshCookieRef();
    }

    function getSessionId() {
        var session = getSession();
        if (session) {
            return session.sessionId;
        } else {
            return '';
        }
    }

    function getName() {
        var session = getSession();
        if (session) {
            return session.name;
        } else {
            return '';
        }
    }
}
