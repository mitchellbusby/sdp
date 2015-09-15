angular.module('utsHelps.directives', [])
.directive('uhActivityDetails', function() {
	return {
		templateUrl: "directives/activity-details/activity-details.html",
		restrict: 'E',
		scope: {
			activityDetails: '=activityDetails',
			expand: '=expand'
		}
	}
})
.directive('uhErrorBox', function() {
	return {
		templateUrl: "directives/uh-error-box/uh-error-box.html",
		restrict: 'E',
		scope: {
			errorMsg: '=errorMessage'
		}
	}
});