'use strict';

angular.module('utsHelps.UpcomingBookings', ['utsHelps.directives', 'helpsRestfulServices', 'ngRoute'])
.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/upcomingBookings', {
		templateUrl: 'views/upcomingBookingsView.html',
		controller: 'UpcomingBookingsCtrl'
	})
}])
.controller('UpcomingBookingsCtrl', ['$scope', 'BookingsModel', function($scope, BookingsModel) {
	$scope.globals.pageTitle = "Bookings";
	$scope.BookingsModel = BookingsModel;
}]);