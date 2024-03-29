'use strict';

angular.module('utsHelps.UpcomingBookings', ['utsHelps.directives', 'helpsRestfulServices', 'ngRoute', 'utsHelps.constants', 'helpsModelsServices'])
.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/upcomingBookings', {
		templateUrl: 'views/upcomingBookingsView.html',
		controller: 'UpcomingBookingsCtrl'
	})
}])
.controller('UpcomingBookingsCtrl', ['$scope', 'BookingsModel', 'NotificationsModel', 'notification_times', 'PostNotification', 'Session', 'AlertBanner', 'UpcomingActivitiesModel', 'Filter', function($scope, BookingsModel, NotificationsModel, notification_times, PostNotification, Session, AlertBanner, UpcomingActivitiesModel, Filter) {
	$scope.globals.pageTitle = "Bookings";
	$scope.BookingsModel = BookingsModel;
	$scope.UpcomingActivitiesModel = UpcomingActivitiesModel;
	$scope.notification = {"triggerTime":1};
	$scope.booking = null;
	$scope.NotificationsModel = NotificationsModel;
	$scope.availableNotificationTimes = notification_times;
	$scope.addNotification = function(booking) {
		//NotificationsModel.refresh();
		$scope.notification = PostNotification.create(Session.userId, booking.BookingId, 1, "You have a HELPS booking in x time", booking.starting, Session.mobile);
		$scope.booking = booking;
		$scope.$broadcast("SHOW_CONFIRM_DENY_CONFIRM_NOTIF");
	};

	$scope.confirmNotificationAdd = function(isConfirmed) {
		if (isConfirmed) {
			NotificationsModel.add($scope.notification).then(function success(isSuccess) {
				if (isSuccess) {
					// Notification sent success
					AlertBanner.publish({
						type:"success",
						message: "Notification created!"
					});
					$scope.NotificationsModel.refresh();
				}
				else {
					$scope.$broadcast("API_ERROR", "Failed to create notification.");
				}
			});
		}
	};

	$scope.cancelNotification = function(notification) {
		$scope.notification = notification;
		$scope.$broadcast("SHOW_CONFIRM_DENY_CANCEL_NOTIF");
	};

	$scope.confirmCancelNotification = function(isConfirmed) {
		if (isConfirmed) {
			NotificationsModel.cancelNotification($scope.notification.notificationID).then(function success(isSuccess) {
				if (isSuccess) {
					AlertBanner.publish({
						type:"success",
						message: "Notification cancelled."
					});
					$scope.NotificationsModel.refresh();
				}
				else {
					$scope.$broadcast("API_ERROR", "Failed to cancel notification.");
				}
			});
		}
	};

	$scope.cancelBooking = function(workshopID) {
		$scope.selectedWorkshop = workshopID;
		$scope.$broadcast("SHOW_CONFIRM_DENY_CANCEL");
	};

	$scope.confirmCancel = function(confirmation) {
		// Do nothing
		if (confirmation) {
			//Do the booking thing
			UpcomingActivitiesModel.cancelWorkshop($scope.selectedWorkshop, Session.userId).then(function (success) {
				if (success) {
					AlertBanner.publish({
						type: "success",
						message: "Booking cancelled.",
						timeCollapse: 3000
					});

				}
				else {
					// Don't trigger a banner
				}
				UpcomingActivitiesModel.refresh();
				BookingsModel.refresh();
			});
		}
		else {
		}
		$scope.selectedWorkshop = null;
	};

	$scope.testNotification = function(notificationId) {
		NotificationsModel.testNotification(notificationId).then(function success(isSuccess) {
			if (isSuccess) {
				AlertBanner.publish({
					type:"success",
					message: "Notification fired."
				});
				$scope.NotificationsModel.refresh();
			}
			else {
				$scope.$broadcast("API_ERROR", "Failed to fire notification.");
			}
		});
	}

	$scope.searchBookings = function(query) {
		var books = BookingsModel.bookingsArray(true);
		console.log("books");
		console.log(books);
		if (query == "") {
			for (var i in books) {
				if (books[i].isWaitList) {
					BookingsModel.bookingFromWorkshopId(books[i].WorkshopId).isFiltered = false;
				} else {
					BookingsModel.bookingFromId(books[i].BookingId).isFiltered = false;
				}
			}
			$scope.$apply();
			return;
		}

		for (var i in books) {
			if (books[i].isWaitList) {
				BookingsModel.bookingFromWorkshopId(books[i].WorkshopId).isFiltered = true;
			} else {
				BookingsModel.bookingFromId(books[i].BookingId).isFiltered = true;
			}
		}

		var transposed = Filter.transposeIntoNamed(books, "topic");
		var filterlist = Filter.filterList(transposed, query);

		for (var i in filterlist) {
			if (books[i].isWaitList) {
				BookingsModel.bookingFromWorkshopId(books[i].WorkshopId).isFiltered = false;
			} else {
				BookingsModel.bookingFromId(books[i].BookingId).isFiltered = false;
			}
		}

		// horrible horrible not bad un-good dependency
		var otherFilterLength = BookingsModel.bookingsArray().filter(BookingsModel.isUpcomingBooking).length;
		var filterlistlen = filterlist.length;
		if (filterlist.length <= otherFilterLength) {
			// No results, show a sad message
			$scope.noSearchResults = true;
		} else {
			$scope.noSearchResults = false;
		}
		$scope.$apply();
	}
	$scope.cancelWaitlisting = function(waitlist) {
		$scope.waitlist = waitlist;
		$scope.$broadcast("SHOW_CONFIRM_DENY_CANCEL_WAIT");
	}
	$scope.confirmCancelWaitlisting = function(isConfirmed) {
		if (isConfirmed) {
			$scope.BookingsModel.cancelWaitlisting($scope.waitlist).then(function success(isSuccess) {
				if (isSuccess) {
					AlertBanner.publish({
						type:"success",
						message: "Cancelled wait listing."
					});
					$scope.BookingsModel.refresh();
				}
				else {
					$scope.$broadcast("API_ERROR", "Failed to cancel waitlisting.");
				}
				$scope.waitlist = null;
			});
		}
		else {
			$scope.waitlist = null;
		}

	}
}]);
