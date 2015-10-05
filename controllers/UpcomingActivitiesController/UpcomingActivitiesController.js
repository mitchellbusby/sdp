'use strict';

angular.module('utsHelps.UpcomingActivities', ['utsHelps.directives', 'helpsRestfulServices', 'ngRoute','infinite-scroll'])
.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/upcomingActivities', {
		templateUrl: 'views/upcomingActivitiesView.html',
		controller: 'UpcomingActivitiesCtrl'
	})
}])
.controller('UpcomingActivitiesCtrl', ['$scope', 'UpcomingActivitiesModel', function($scope, UpcomingActivitiesModel){
	$scope.globals.pageTitle = "Upcoming Activities";
	$scope.UpcomingActivitiesModel = UpcomingActivitiesModel;
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
}]);