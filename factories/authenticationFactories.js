'use strict';

angular.module('utsHelps.auths', ['ngRoute', 'utsHelps.constants', 'LocalStorageModule'])
// These constants can be injected via HelpsRestfulServices
.factory('AuthService',['$http', 'Session', '$q', 'helps_endpoint_constants', 'localStorageService', function ($http, Session, $q, endpoint_constants, localStorageService) {
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
			if (result.data.Results.length > 0 && result.data.Results[0] != undefined) {
				// Login is successful
				var user = result.data.Results[0];
				Session.create('1', credentials.username, 
					 user.preferredName!==undefined ? user.preferredName : credentials.username,
					 'User');
				if (localStorageService.isSupported && credentials.rememberMe) {
					localStorageService.set('username',credentials.username);
					localStorageService.set('pwd', credentials.password);
				}
				return true;
			}
			else {
				return false;
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
		if (localStorageService.isSupported) {
			localStorageService.remove('username');
			localStorageService.remove('pwd');
		}
	}

	authService.logoutFake = function() {
		Session.destroy();
		if (localStorageService.isSupported) {
			localStorageService.remove('username');
			localStorageService.remove('pwd');
		}
		return $q(function(resolve, reject) {
			setTimeout(function() {
				if (true) {return resolve();}
				else {return reject();}
			})
		});
	}
	authService.onCreate = function() {
		if (localStorageService.isSupported) {
			//if (localStorageService.key)
			var username = localStorageService.get('username');
			var password = localStorageService.get('pwd');
			console.log("Getting called!");
			console.log(username);
			console.log(password);
			if (username!=undefined && password!=undefined) {
				var credentials = {
					username: username,
					password: password
				};
				return authService.login(credentials);
			}
		}
		return {then:function(callback){callback(false)}};
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