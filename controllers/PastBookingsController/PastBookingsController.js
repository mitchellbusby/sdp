'use strict';

angular.module('utsHelps.PastBookings', ['utsHelps.directives', 'helpsRestfulServices', 'ngRoute'])
.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/pastBookings', {
		templateUrl: 'views/pastBookingsView.html',
		controller: 'PastBookingsCtrl'
	})
}])
.controller('PastBookingsCtrl', ['$scope', 'BookingsModel', function($scope, BookingsModel) {
	$scope.globals.pageTitle = "Past Bookings";
	$scope.BookingsModel = BookingsModel;
}]);