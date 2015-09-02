// App.js
'use strict'

angular.module('utsHelps', [
	'ngRoute',
	'utsHelps.example'
	])
.config(['$routeProvider', function($routeProvider){
	$routeProvider.otherwise({redirectTo:'/example'});
}])
.run(function() {
	console.log("Angular initialised!");
	$(document).ready(function(){
		$(document).foundation();
	});
})
.controller('ApplicationController', ['$scope', function($scope){

}]);