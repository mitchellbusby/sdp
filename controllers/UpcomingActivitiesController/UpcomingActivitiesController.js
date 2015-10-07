'use strict';

angular.module('utsHelps.UpcomingActivities', ['utsHelps.directives', 'helpsRestfulServices', 'ngRoute','infinite-scroll'])
.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/upcomingActivities', {
		templateUrl: 'views/upcomingActivitiesView.html',
		controller: 'UpcomingActivitiesCtrl'
	})
}])
.controller('UpcomingActivitiesCtrl', ['$scope', 'UpcomingActivitiesModel', 'Session', 'AlertBanner', function($scope, UpcomingActivitiesModel, Session, AlertBanner){
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
	};

	$scope.onViewMore = function(){
        $scope.UpcomingActivitiesModel.getMoreActivities();
	};

	$scope.bookWorkshop = function(workshop) {
		// Prepare
		$scope.selectedWorkshop = workshop;
		// Make it appear
		$scope.$broadcast("SHOW_CONFIRM_DENY");		 
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

    $scope.addWaitlist = function(workshop){
        // Prepare
        $scope.selectedWorkshop = workshop;
        // Show Waitlist CONFIRM_DENY
        //$scope.$broadcast("SHOW_WAITLIST_CONFIRM_DENY");
    };

}]);