'use strict';

angular.module('utsHelps.register', ['ngRoute'])

.config(['$routeProvider'], function($routeProvider) {
	$routeProvider.when('/login', {
		templateUrl: 'views/RegisterView.html',
		controller: 'registerCtrl'
	});
})

.controller('registerCtrl', ['$scope', '$rootScope', function ($scope, $rootScope, User, Student) {
	$scope.user = User.create("", "", "", "");
	$scope.student = Student.empty();
}])