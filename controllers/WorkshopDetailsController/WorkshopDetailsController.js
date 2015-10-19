'use strict';

angular.module('utsHelps.WorkshopDetails', ['utsHelps.directives', 'helpsRestfulServices', 'ngRoute'])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/workshops/:workshopID', {
			templateUrl: 'views/workshopDetailsView.html',
			controller: 'WorkshopDetailsCtrl'
		})
	}])
	.controller('WorkshopDetailsCtrl', ['$scope', '$routeParams', 'UpcomingActivitiesModel', 'BookingsModel', function($scope, $routeParams, UpcomingActivitiesModel, BookingsModel) {
		$scope.globals.pageTitle = "Workshop Details";
		$scope.workshopID = $routeParams.workshopID;
		$scope.BookingsModel = BookingsModel;
		$scope.UpcomingActivitiesModel = UpcomingActivitiesModel;
	}]);