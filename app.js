// App.js
'use strict'

angular.module('utsHelps', [
	'ngRoute',
	'helpsRestfulServices',
	'utsHelps.example',
	'utsHelps.UpcomingActivities',
	'angular.filter',
	'ngAnimate'
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
.controller('ApplicationController', ['$scope', function($scope){

}]);