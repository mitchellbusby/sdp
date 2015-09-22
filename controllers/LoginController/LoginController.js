'use strict';

angular.module('utsHelps.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'views/loginView.html',
    controller: 'loginCtrl'
  })
  .when('/example', {
	  templateUrl: 'views/exampleView.html',
	  controller: 'exampleCtrl'
  });
}])

.constant('AUTH_EVENTS', {
	loginSuccess: 'auth-login-sucess',
	loginFailed: 'auth-login-failed',
	logoutSuccess: 'auth-logout-success',
	sessionTimeout: 'auth-session-timeout',
	notAuthenticated: 'auth-not-authenticated',
	notAuthorized: 'auth-not-authorized'
})

.constant('USER_ROLES', {
	all: '*',
	admin: 'admin',
	editor: 'editor',
	guest: 'guest'
})

.controller('loginCtrl', ['$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService', 
	function($scope, $rootScope, AUTH_EVENTS, AuthService) {
		$scope.credentials = {
			username: '',
			password: ''
		};
		$scope.login = function (credentials) {
			AuthService.loginFake(credentials).then(function (user) {
				$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
				$scope.setCurrentUser(user);
			}, function () {
				$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
			});
		};
	}]);