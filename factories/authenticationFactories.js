'use strict';

angular.module('utsHelps.auths', ['ngRoute', 'utsHelps.constants'])
// These constants can be injected via HelpsRestfulServices
.factory('AuthService',['$http', 'Session', '$q', 'helps_endpoint_constants', function ($http, Session, $q, endpoint_constants) {
	var authService = {};
	authService.loginFake = function (credentials){
		return $q(function(resolve, reject) {
			setTimeout(function() {
				if (credentials.username === 'mbusby') {
					reject("User is unauthenticated");
				}
				else {
					Session.create('1', 11899859, credentials.username, 'User');
					resolve(credentials.username);
				}
			}, 1000);
		});
	}
	authService.login = function (credentials) {
		// this will probably need to be rewritten when real login functionality 
		// is implemented
		var loginConfig = {
			"params": {"studentId" : credentials.username},
			"headers": {"AppKey" : endpoint_constants.APP_KEY},
		};
		return $http.get(endpoint_constants.ENDPOINT_URI+endpoint_constants.GET_STUDENT_URI, loginConfig)
		.then(function success(result) {
			if (result.data.Results.length > 0 && result.data.Results[0] !== undefined) {
				// Login is successful
				var user = result.data.Results[0];
				Session.create('1', credentials.username, 
					 user.preferredName!==undefined ? user.preferredName : credentials.username,
					 'User');
				return Session.username;
			}
			else {
				return "User is unauthenticated";
			}
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