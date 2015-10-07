'use strict';

angular.module('utsHelps.auths', ['ngRoute', 'helpsRestfulServices', 'utsHelps.constants', 'LocalStorageModule', 'helpsModelsServices'])
// These constants can be injected via HelpsRestfulServices
.factory('AuthService',['$http', 'Session', '$q', 'localStorageService', 'User', function ($http, Session, $q, localStorageService, User) {
	var authService = {};
	authService.loginFake = function (credentials){
		return $q(function(resolve, reject) {
			setTimeout(function() {
				if (credentials.username === 'mbusby') {
					reject("User is unauthenticated");
				}
				else {
					Session.create('1', 11899859, credentials.username, 'User');
					if (localStorageService.isSupported) {
						localStorageService.set('session', JSON.stringify({
							id: '1',
							userId: 11899859,
							username: credentials.username,
							userRole: 'User' 
						}));
					}
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
			if (localStorageService.isSupported) {
				localStorageService.set('session', JSON.stringify(Session));
			}
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
		localStorageService.remove('session');
		Session.destroy();
	}

	authService.logoutFake = function() {
		if (localStorageService.isSupported) {localStorageService.remove('session');}
		Session.destroy();
		return $q(function(resolve, reject) {
			setTimeout(function() {
				if (true) {return resolve();}
				else {return reject();}
			})
		});
	}
	authService.onCreate = function() {
		if (localStorageService.isSupported) {
			var retrievedSession = localStorageService.get('session');
			if (retrievedSession) {
				var session = JSON.parse(retrievedSession);
				Session.create(session.id, session.userId, session.username, session.userRole);
			}
			else {
				//Do nothing, as the user does not exist yet
			}
		}
		else {
			//Degrade gracefully
		}
		console.log(Session);
	}
	authService.onCreate();
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