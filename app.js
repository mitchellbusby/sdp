// App.js
'use strict'

angular.module('utsHelps', [
	'ngRoute',
	'helpsRestfulServices',
	'utsHelps.example',
	'utsHelps.UpcomingActivities',
	'angular.filter',
	'ngAnimate',
	'utsHelps.constants'
	])
.config(['$routeProvider', function($routeProvider){
	$routeProvider.otherwise({redirectTo:'/example'});
}])
.run(function() {
	console.log("Angular initialised!");
	$(document).ready(function(){
		$(document).foundation({
			offcanvas: {
				close_on_click: true
			}
		});
	});
})
.controller('ApplicationController', ['$scope', 'ERR_BROADCASTS', function($scope, ERR_BROADCASTS){
	$scope.globals = {
		pageTitle: "UTS HELPS"
	};
	$scope.err_message = "";
	$scope.$on(ERR_BROADCASTS.API_ERROR, function triggerErrorModal(e, err_message) {
		console.log("Error in API! "+err_message);
		$scope.err_message = err_message;
		$("#uh-error-modal").foundation('reveal', 'open');
	});
	$scope.triggerCloseModal = function() {
		$("#uh-error-modal").foundation('reveal', 'close');
	}
}]);