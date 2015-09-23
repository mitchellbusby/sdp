'use strict';

angular.module('utsHelps.auths', ['ngRoute', 'helpsRestfulServices'])
// These constants can be injected via HelpsRestfulServices
.factory('AuthService',['$http', 'Session', function ($http, Session) {
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
}])
//There used to be a service in here but it should be injected from the restful 
//services
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