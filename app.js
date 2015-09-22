// App.js
'use strict'

angular.module('utsHelps', [
	'ngRoute',
	'utsHelps.auths',
	'utsHelps.example',
	'utsHelps.login',
	'helpsRestfulServices',
	'utsHelps.example',
	'utsHelps.UpcomingActivities',
	'angular.filter',
	])
.config(['$routeProvider', function($routeProvider){
	$routeProvider.otherwise({redirectTo:'/example'});
}])
.config(['$httpProvider', function ($httpProvider) {
	$httpProvider.interceptors.push([
		'$injector',
		function ($injector) {
			return $injector.get('AuthInterceptor');
		}
	]);
}])
.run(['$rootScope', 'AUTH_EVENTS', 'AuthService', '$location', function($rootScope, AUTH_EVENTS, AuthService, $location) {
	console.log("Angular initialised!");
	$(document).ready(function(){
		$(document).foundation({
			offcanvas: {
				close_on_click: true
			}
		});
	});
	
	// Redirect the user if they're lost
	$rootScope.$on("$locationChangeStart", function (event, next, current) {
		if (!AuthService.isAuthenticated()) {
			if (next.templateUrl!="views/loginView.html"){
				$location.path("/login");
			}
		}
	});
	
	// Redirect if user if they have been logged in and logged out
	$rootScope.$on(AUTH_EVENTS.loginSuccess, function(event){
		$location.path("/example"); // dashboard
	});
	
	$rootScope.$on(AUTH_EVENTS.logoutSuccess, function(event) {
		$location.path("/login");
	});
}])
.controller('ApplicationController', ['$scope', 'USER_ROLES', 'AuthService', function($scope, USER_ROLES, AuthService) {
	$scope.currentUser = null;
	$scope.userRoles = USER_ROLES;
	$scope.isAuthorized = AuthService.isAuthorized;
	
	$scope.setCurrentUser = function (user) { 
		$scope.currentUser = user;
	};
	
	$scope.isLoginPage = true;
}]);