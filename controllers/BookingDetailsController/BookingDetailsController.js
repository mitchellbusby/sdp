'use strict';

angular.module('utsHelps.BookingDetails', ['utsHelps.directives', 'helpsRestfulServices', 'ngRoute'])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/bookings/:bookingID', {
			templateUrl: 'views/bookingDetailsView.html',
			controller: 'BookingDetailsCtrl'
		})
	}])
	.controller('BookingDetailsCtrl', ['$scope', '$routeParams', 'BookingsModel', function($scope, $routeParams, BookingsModel) {
		console.log("BookingDetailsCtrl");
		$scope.globals.pageTitle = "Booking Details";
		$scope.bookingID = $routeParams.bookingID;
		$scope.BookingsModel = BookingsModel;
	}]);