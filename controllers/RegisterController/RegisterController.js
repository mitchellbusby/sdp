'use strict';

angular.module('utsHelps.register', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/register1', {
		templateUrl: 'views/register/1.html',
		controller: 'registerCtrl'
	});
	$routeProvider.when('/register2', {
		templateUrl: 'views/register/2.html',
		controller: 'registerCtrl'
	});
	$routeProvider.when('/register3', {
		templateUrl: 'views/register/3.html',
		controller: 'registerCtrl'
	});
}])

.controller('registerCtrl', ['$scope', '$rootScope', 'User', 'Student', 'RegisterService', function ($scope, $rootScope, User, Student, RegisterService) {
	$scope.details = {	
		user: RegisterService.getUser(),
		student: RegisterService.getStudent()
	};
	
	$scope.goRegisterOne = function() {
		RegisterService.goRegisterPageOne();
	};
	
	$scope.goRegisterTwo = function() {
		RegisterService.goRegisterPageTwo();
	};
	
	$scope.goRegisterThree = function() { 
		RegisterService.goRegisterPageThree();
	};
}]);