'use strict';

angular.module('utsHelps.UpcomingActivities', ['utsHelps.directives', 'helpsRestfulServices', 'ngRoute'])
.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/upcomingActivities', {
		templateUrl: 'views/upcomingActivitiesView.html',
		controller: 'UpcomingActivitiesCtrl'
	})
}])
.controller('UpcomingActivitiesCtrl', ['$scope', 'UpcomingActivitiesModel', 'Session', 'AlertBanner', 'WorkshopBookingsServiceMitchell', function($scope, UpcomingActivitiesModel, Session, AlertBanner, WorkshopBookingsModel){
	$scope.globals.pageTitle = "Upcoming Activities";
	$scope.UpcomingActivitiesModel = UpcomingActivitiesModel;
	$scope.selectedWorkshop = null;
	$scope.clickedOnAnActivity = function(activity) {
		var activityAsString = JSON.stringify(activity);
		for (var workshopId in $scope.UpcomingActivitiesModel.activities) {
			if (activityAsString === JSON.stringify($scope.UpcomingActivitiesModel.activities[workshopId])) {
				activity.isExpanded=!activity.isExpanded;
			}
			else {
				$scope.UpcomingActivitiesModel.activities[workshopId].isExpanded = false;
			}
		}
	}
	$scope.bookWorkshop = function(workshop) {
		// Prepare
		$scope.selectedWorkshop = workshop;
		// Make it appear
		$scope.$broadcast("SHOW_CONFIRM_DENY_BOOK");		 
	};
	$scope.confirmWorkshop = function(confirmation) {
		if (confirmation) {
			UpcomingActivitiesModel.bookWorkshop($scope.selectedWorkshop.WorkshopId, Session.userId)
			.then(function(success) {
				if (success) {
				 		// Trigger banner to say successful booking made
				 		AlertBanner.publish({
				 			type: "success",
				 			message: "Successfully made a booking.",
				 			timeCollapse: 3000
				 		});
				 	}		
				 	else {
				 		// Don't trigger a banner
				 	}
				 });
		}
		$scope.selectedWorkshop = null;
	}
	$scope.cancelBooking = function(workshop) {
		$scope.selectedWorkshop = workshop;
		$scope.$broadcast("SHOW_CONFIRM_DENY_CANCEL");
	}
	$scope.confirmCancel = function(confirmation) {
		// Do nothing
		if (confirmation) {
		}
		else {
		}
		$scope.selectedWorkshop = null;
	}
}]);