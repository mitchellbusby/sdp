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
})
.controller('ApplicationController', ['$scope', function($scope){

}]);