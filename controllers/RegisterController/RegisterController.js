'use strict';

angular.module('utsHelps.register', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/login', {
		templateUrl: 'views/RegisterView.html',
		controller: 'registerCtrl'
	});
}])

.controller('registerCtrl', ['$scope', '$rootScope', 'User', 'Student', 'RegisterService', '$location', function ($scope, $rootScope, User, Student, RegisterService, $location) {
	$scope.details = {
		user: RegisterService.getUser(),
		student: RegisterService.getStudent()
	};
	
	
}]);