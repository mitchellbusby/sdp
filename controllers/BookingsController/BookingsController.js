'use strict';

angular.module('utsHelps.Bookings', ['utsHelps.directives', 'helpsRestfulServices', 'ngRoute'])
.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/bookings', {
		templateUrl: 'views/BookingsView.html',
		controller: 'BookingsCtrl'
	})
}])
.controller('BookingsCtrl', ['$scope', 'BookingsModel', function($scope, BookingsModel) {
	$scope.globals.pageTitle = "Bookings";
	$scope.BookingsModel = BookingsModel;
}]);