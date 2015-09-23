// App.js
'use strict'

angular.module('utsHelps', [
	'ngRoute',
	'utsHelps.auths',
	'utsHelps.example',
	'utsHelps.login',
	'helpsRestfulServices',
	'utsHelps.example',
	'utsHelps.UpcomingActivities',
	'angular.filter',
	'ngAnimate',
	'angular-loading-bar',
	'utsHelps.constants'
	])
.config(['$routeProvider', 'cfpLoadingBarProvider', function($routeProvider, cfpLoadingBarProvider){
	$routeProvider.otherwise({redirectTo:'/example'});
	cfpLoadingBarProvider.includeSpinner = false;
}])
.config(['$httpProvider', function ($httpProvider) {
	$httpProvider.interceptors.push([
		'$injector',
		function ($injector) {
			return $injector.get('AuthInterceptor');
		}
		]);
}])
.run(['$rootScope', 'AUTH_EVENTS', 'AuthService', '$location', function($rootScope, AUTH_EVENTS, AuthService, $location) {
	console.log("Angular initialised!");
	$(document).ready(function(){
		$(document).foundation({
			offcanvas: {
				close_on_click: true
			}
		});
	});
	$(document).on('open.fndtn.offcanvas', '[data-offcanvas]', function () {
		var off_canvas_wrap = $(this);
		$('#loading-bar').addClass("hide");
		$('#loading-bar-spinner').addClass("hide");
	});

	$(document).on('close.fndtn.offcanvas', '[data-offcanvas]', function () {
		var off_canvas_wrap = $(this);
		$("#loading-bar").removeClass("hide");
		$('#loading-bar-spinner').addClass("hide");
	});	
	// Redirect the user if they're lost
	$rootScope.$on("$locationChangeStart", function (event, next, current) {
		if (!AuthService.isAuthenticated()) {
			if (next.templateUrl!="views/loginView.html"){
				$location.path("/login");
			}
		}
	});
	
	// Redirect if user if they have been logged in and logged out
	$rootScope.$on(AUTH_EVENTS.loginSuccess, function(event){
		$location.path("/example"); // dashboard
	});
	
	$rootScope.$on(AUTH_EVENTS.logoutSuccess, function(event) {
		$location.path("/login");
	});
}])
.controller('ApplicationController', ['$scope', 'USER_ROLES', 'AuthService', 'ERR_BROADCASTS', function($scope, USER_ROLES, AuthService, ERR_BROADCASTS) {
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
	$scope.currentUser = null;
	$scope.userRoles = USER_ROLES;
	$scope.isAuthorized = AuthService.isAuthorized;
	
	$scope.setCurrentUser = function (user) { 
		$scope.currentUser = user;
	};
	
	$scope.isLoginPage = true;
}]);