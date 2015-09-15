'use strict';

angular.module('utsHelps.UpcomingActivities', ['utsHelps.directives', 'helpsRestfulServices', 'ngRoute'])
.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/upcomingActivities', {
		templateUrl: 'views/upcomingActivitiesView.html',
		controller: 'UpcomingActivitiesCtrl'
	})
}])
.controller('UpcomingActivitiesCtrl', ['$scope', 'UpcomingActivitiesModel', function($scope, UpcomingActivitiesModel){
	$scope.UpcomingActivitiesModel = UpcomingActivitiesModel;
	$scope.clickedOnAnActivity = function(activity) {
		var activityAsString = JSON.stringify(activity);
		console.log($scope.UpcomingActivitiesModel.activities);
		for (var workshopId in $scope.UpcomingActivitiesModel.activities) {
			if (activityAsString === JSON.stringify($scope.UpcomingActivitiesModel.activities[workshopId])) {
				console.log("It was equal!");
				activity.isExpanded=!activity.isExpanded;
			}
			else {
				$scope.UpcomingActivitiesModel.activities[workshopId].isExpanded = false;
			}
		}
	}
}]);