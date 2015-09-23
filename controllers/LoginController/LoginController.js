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