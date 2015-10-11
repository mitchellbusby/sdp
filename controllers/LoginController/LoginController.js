'use strict';

angular.module('utsHelps.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/login', {
		templateUrl: 'views/loginView.html',
		controller: 'loginCtrl'
	});
}])
.controller('loginCtrl', ['$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService', 'RegisterService',
	function($scope, $rootScope, AUTH_EVENTS, AuthService, RegisterService) {
		$scope.credentials = {
			username: '',
			password: ''
		};
		$scope.loginFailed = false;
		$scope.login = function (credentials) {
			AuthService.loginFake(credentials).then(function (user) {
				$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
				$scope.setCurrentUser(user);
			}, function (err) {
				$scope.loginFailed = true;
				$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
			});
		};

		$scope.goRegister = function(credentials) {
			RegisterService.setUserFromLogin(credentials.username, credentials.password);
			RegisterService.goRegisterPageOne();
		};
	}]);
