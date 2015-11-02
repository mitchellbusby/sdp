'use strict';

angular.module('utsHelps.Help', ['ngRoute'])
.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/help', {
		templateUrl: 'views/helpView.html',
		controller: 'HelpController'
	})
}])
.controller('HelpController', ['$scope',function($scope) {
	$scope.globals.pageTitle = "Help";



}]);