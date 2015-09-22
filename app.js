// App.js
'use strict'

angular.module('utsHelps', [
	'ngRoute',
	'utsHelps.example',
	'utsHelps.login',
	'helpsRestfulServices',
	'utsHelps.example',
	'utsHelps.UpcomingActivities',
	'angular.filter',
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