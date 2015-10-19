'use strict';

angular.module('utsHelps.UpcomingBookings', ['utsHelps.directives', 'helpsRestfulServices', 'ngRoute', 'utsHelps.constants', 'helpsModelServices'])
.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/upcomingBookings', {
		templateUrl: 'views/upcomingBookingsView.html',
		controller: 'UpcomingBookingsCtrl'
	})
}])
.controller('UpcomingBookingsCtrl', ['$scope', 'BookingsModel', 'NotificationsModel', 'notification_times', 'PostNotification', 'Session', function($scope, BookingsModel, NotificationsModel, notification_times, PostNotification, Session) {
	$scope.globals.pageTitle = "Bookings";
	$scope.BookingsModel = BookingsModel;
	$scope.notification = {"triggerTime":1};
	$scope.NotificationsModel = NotificationsModel.notifications;
	$scope.availableNotificationTimes = notification_times
	$scope.addNotification = function(booking) {
		//NotificationsModel.refresh();
		//$scope.notification 
		$scope.notification = PostNotification.create(Session.userId, booking.bookingId, "You have a HELPS booking in x time", 1);
		$scope.$broadcast("SHOW_CONFIRM_DENY_CONFIRM_NOTIF");
	}
	$scope.confirmNotificationAdd = function(isConfirmed) {
		if (isConfirmed) {
			NotificationsModel.add($scope.notification);			
		}
	}
}]);