'use strict';

angular.module('utsHelps.WorkshopDetails', ['utsHelps.directives', 'helpsRestfulServices', 'ngRoute'])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/workshops/:workshopID', {
			templateUrl: 'views/workshopDetailsView.html',
			controller: 'WorkshopDetailsCtrl'
		})
	}])
	.controller('WorkshopDetailsCtrl', ['$scope', '$routeParams', 'BookingsModel', function($scope, $routeParams, BookingsModel) {
		$scope.globals.pageTitle = "Details";
		$scope.bookingID = $routeParams.workshopID;
		$scope.BookingsModel = BookingsModel;
		$scope.bookingDetails = BookingsModel.getBooking($scope.bookingID);
	}]);