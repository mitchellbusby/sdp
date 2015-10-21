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

.controller('registerCtrl', ['$scope', '$rootScope', 'User', 'Student',
	'RegisterService', 'ERR_BROADCASTS',
	function ($scope, $rootScope, User, Student, RegisterService, ERR_BROADCASTS) {
	$scope.details = {
		user: RegisterService.getUser(),
		student: RegisterService.getStudent()
	};

	$scope.pageOneToTwo = function() {
		if (!RegisterService.isStudentRegistered($scope.details.student.StudentId)) {
			$scope.goRegisterTwo();
		} else {
			//$rootScope.$broadcast(ERR_BROADCASTS.API_ERROR, "StudentIdExists");
		}
	}

	$scope.goRegisterOne = function() {
		RegisterService.goRegisterPageOne();
	};

	$scope.goRegisterTwo = function() {
		RegisterService.goRegisterPageTwo();
	};

	$scope.goRegisterThree = function() {
		RegisterService.goRegisterPageThree();
	};

	$scope.registerStudent = function() {
		RegisterService.registerUserDetails();
	}
}]);
