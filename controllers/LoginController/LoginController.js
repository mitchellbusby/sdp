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

.controller('loginCtrl', ["$scope", "$timeout", "$window", function($scope, $timeout, $window) {
	$scope.loading = false;
	$scope.loginSuccessful = true;
	$scope.onLogin = function() {
		$scope.loading = true;
	};
	$scope.loginProcess = function() { 
		return true; // don't return true when we have the API.
	};
	var timer = false;
	$scope.$watch('loading', function() {
			if (timer) {
				$timeout.cancel(timer);
			}
			timer = $timeout(function () {
				if ( $scope.loginProcess() && $scope.loading){
					$window.location = '#/example';
					$scope.loading = false;
					return true;
				} else {
					return false;
				}
			}, 200)
	});
}]);