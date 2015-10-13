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
		$scope.login = function (credentials) {
			AuthService.login(credentials).then(function (isSuccess) {
				if (isSuccess) {$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);}
				else {$rootScope.$broadcast(AUTH_EVENTS.loginFailed);}
			}, function (err) {
				$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
			});
		};

		$scope.goRegister = function(credentials) {
			RegisterService.setUserFromLogin(credentials.username, credentials.password);
			RegisterService.goRegisterPageOne();
		};
	}]);
