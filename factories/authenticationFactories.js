'use strict';

angular.module('utsHelps.auths', ['ngRoute', 'helpsRestfulServices', 'utsHelps.constants'])
// These constants can be injected via HelpsRestfulServices
.factory('AuthService',['$http', 'Session', '$q', function ($http, Session, $q) {
	var authService = {};
	authService.loginFake = function (credentials){
		return $q(function(resolve, reject) {
			setTimeout(function() {
				if (credentials.username === 'mbusby') {
					reject("User is unauthenticated");
				}
				else {
					Session.create('1', 123456, credentials.username, 'User');
					resolve(credentials.username);
				}
			}, 1000);
		});
	}
	authService.login = function (credentials) {
		// this will probably need to be rewritten when real login functionality 
		// is implemented
		return $http.post('/', credentials)
		.then(function (res) { 
			Session.create(res.data.id, res.data.user.id,
				res.data.user.role);
			return res.data.user;
		});
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
	
	authService.logout = function() {
		//This is yet to be filled in
		Session.destroy();
	}

	authService.logoutFake = function() {
		Session.destroy();
		return $q(function(resolve, reject) {
			setTimeout(function() {
				if (true) {return resolve();}
				else {return reject();}
			})
		});
	}

	return authService;
}])
//There used to be a service in here but it should be injected from the restful 
//services
.factory('AuthInterceptor', ['$rootScope', '$q', 'AUTH_EVENTS', function ($rootScope, $q, AUTH_EVENTS){
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
}]);