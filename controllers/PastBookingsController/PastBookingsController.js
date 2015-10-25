'use strict';

angular.module('utsHelps.PastBookings', ['utsHelps.directives', 'helpsRestfulServices', 'ngRoute', 'utsHelps.UserMessagingService'])
.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/pastBookings', {
		templateUrl: 'views/pastBookingsView.html',
		controller: 'PastBookingsCtrl'
	})
}])
.controller('PastBookingsCtrl', ['$scope', 'BookingsModel', 'UserMessagingService', function($scope, BookingsModel, UserMessagingService) {
	$scope.globals.pageTitle = "Past Bookings";
	$scope.BookingsModel = BookingsModel;
	$scope.saveNote = function(booking) {
		BookingsModel.saveNote(booking)
			.then(function(response) {
				if (response.data.IsSuccess) {
					UserMessagingService.successAlertBanner("Successfully updated notes.");
					booking.editNote = false;
				}
				else {
					// Error!
				}
			});
	};
}]);