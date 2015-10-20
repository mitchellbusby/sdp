'use strict';

angular.module('utsHelps.UpcomingBookings', ['utsHelps.directives', 'helpsRestfulServices', 'ngRoute', 'utsHelps.constants', 'helpsModelsServices'])
.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/upcomingBookings', {
		templateUrl: 'views/upcomingBookingsView.html',
		controller: 'UpcomingBookingsCtrl'
	})
}])
.controller('UpcomingBookingsCtrl', ['$scope', 'BookingsModel', 'NotificationsModel', 'notification_times', 'PostNotification', 'Session', 'AlertBanner',function($scope, BookingsModel, NotificationsModel, notification_times, PostNotification, Session, AlertBanner) {
	$scope.globals.pageTitle = "Bookings";
	$scope.BookingsModel = BookingsModel;
	$scope.notification = {"triggerTime":1};
	$scope.NotificationsModel = NotificationsModel.notifications;
	$scope.availableNotificationTimes = notification_times
	$scope.addNotification = function(booking) {
		//NotificationsModel.refresh();
		//$scope.notification 
		$scope.notification = PostNotification.create(Session.userId, booking.bookingId, 1, "You have a HELPS booking in x time", Session.mobileNumber);
		$scope.$broadcast("SHOW_CONFIRM_DENY_CONFIRM_NOTIF");
	}
	$scope.confirmNotificationAdd = function(isConfirmed) {
		if (isConfirmed) {
			NotificationsModel.add($scope.notification).then(function success(isSuccess) {
				if (isSuccess) {
					// Notification sent success
					AlertBanner.publish({
						type:"success",
						message: "Notification created!"
					});
				}
				else {
					$scope.$broadcast("API_ERROR", "Failed to create notification.");
				}
			});			
		}
	}
}]);