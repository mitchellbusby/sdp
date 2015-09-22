'use strict';

angular.module('utsHelps.auths', ['ngRoute'])
.constant("auth_endpoint_constants", {
	"ENDPOINT_URI": "http://helpshere.cloudapp.net/api",
	"port": "80",
	"APP_KEY":"123456",
	"ACTIVITIES_URI": "/workshop",
	"SEARCH_URI":"/search", // likely don't need this.
})
.factory('AuthService', function ($http, Session) {
	var authService = {};
	authService.loginFake = function (credentials){
		Session.create("1", "TestUser", "User");
		return {
			then: function (func) { func(); },
			username: credentials.username,
			userRole: "User",
			userId: "1"
		};
	}
	authService.login = function (credentials) {
		return $http.post('/', credentials)
			.then(function (res) { 
				Session.create(res.data.id, res.data.user.id,
								res.data.user.role);
				return res.data.user;
			})
	};
	
	authService.isAuthenticated = function() {
		return !!Session.userId;
	}
	
	authService.isAuthorized = function (authorizedRoles) {
		if (!angular.isArray(authorizedRoles)) {
			authorizedRoles = [authorizedRoles];
		}
		return (authService.isAuthenticated() && 
			authorizedRoles.indexOf(Session.userRole) !== -1);
	};
	
	return authService;
})

.service('Session', function () {
	this.create = function (sessionId, userId, userRole) {
		this.id = sessionId;
		this.userId = userId;
		this.userRole = userRole;
	};
	
	this.destroy = function() {
		this.id = null;
		this.userId = null;
		this.userRole = null;
	};
})
.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS){
	return {
		responseError: function (response) {
			$rootScope.$broadcast({
				401: AUTH_EVENTS.notAuthenticated,
				403: AUTH_EVENTS.notAuthorized,
				419: AUTH_EVENTS.sessionTimeout,
				440: AUTH_EVENTS.sessionTimeout
			}[response.status], response);
			return $q.reject(response);
		}
	}
});