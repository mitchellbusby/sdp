'use strict';

angular.module('utsHelps.UpcomingActivities', ['utsHelps.directives', 'helpsRestfulServices', 'ngRoute'])
.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/upcomingActivities', {
		templateUrl: 'views/upcomingActivitiesView.html',
		controller: 'UpcomingActivitiesCtrl'
	})
}])
.controller('UpcomingActivitiesCtrl', ['$scope', 'UpcomingActivitiesModel', 'Session', 'AlertBanner', 'BookingsModel', 'Filter', function($scope, UpcomingActivitiesModel, Session, AlertBanner, WorkshopBookingsModel, Filter){
	$scope.globals.pageTitle = "Upcoming Activities";
	$scope.WorkshopBookingsModel = WorkshopBookingsModel;
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
        $scope.UpcomingActivitiesModel.getMoreActivities().then(function(moreActivitiesWereFound) {
        	if (!moreActivitiesWereFound) {
        		AlertBanner.publish({
        			type: "info",
        			message: "No more activities found.",
        			timeCollapse: 3000
        		});
        	}
        });
	};

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
				UpcomingActivitiesModel.refresh();
				WorkshopBookingsModel.refresh();
			});

		}
		$scope.selectedWorkshop = null;
	};

	$scope.cancelBooking = function(workshop) {
		$scope.selectedWorkshop = workshop;
		$scope.$broadcast("SHOW_CONFIRM_DENY_CANCEL");
	};
	$scope.confirmCancel = function(confirmation) {
		// Do nothing
		if (confirmation) {
			//Do the booking thing
			UpcomingActivitiesModel.cancelWorkshop($scope.selectedWorkshop.WorkshopId, Session.userId).then(function(success){
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
				WorkshopBookingsModel.refresh();
			});
		}
		else {
		}
		$scope.selectedWorkshop = null;
	}
    $scope.addToWaitlist = function(workshop){
        $scope.selectedWorkshop = workshop;
        WorkshopBookingsModel.getWaitListCount(workshop.WorkshopId)
        .then(function success(count) {
        	$scope.selectedWorkshop.count = count;
        	$scope.$broadcast("SHOW_CONFIRM_DENY_ADDTOWAITLIST");        
        });
    };

    $scope.confirmAddToWaitlist = function(confirmation){
        if (confirmation){
            UpcomingActivitiesModel.addToWaitlist($scope.selectedWorkshop.WorkshopId, Session.userId)
                .then(function(success){
                    if (success){
                        AlertBanner.publish({
                            type: "success",
                            message: "Successfully added to waitlist",
                            timeCollapse: 3000
                        });
                    }
                    else{
                        //Do nothing
                    }
        			$scope.WorkshopBookingsModel.refresh();
                });
        }
        //reset seleted workshop
        $scope.selectedWorkshop = null;
    }

		$scope.searchActivies = function(query) {
			var acts = UpcomingActivitiesModel.activities;
			if (query == "") {
				// clear the filter
				for (var i in acts) {
					acts[i].isFiltered = false;
				}
				$scope.$apply();
				return;
			}

			for (var i in acts) {
				acts[i].isFiltered = true;
			}

		  var transposedValues = Filter.transposeIntoNamed(acts, "topic");
			var filterlist = Filter.filterList(transposedValues, query);
			for (var i in filterlist) {
				filterlist[i].isFiltered = false;
			}
			$scope.$apply();
		}
}]);
