// App.js
'use strict'

angular.module('utsHelps', [
	'ngRoute',
	'utsHelps.auths',
	'utsHelps.example',
	'utsHelps.login',
	'helpsRestfulServices',
	'utsHelps.register',
	'utsHelps.UpcomingActivities',
	'utsHelps.registerService',
	'utsHelps.UpcomingBookings',
	'utsHelps.PastBookings',
	'utsHelps.Dashboard',
	'angular.filter',
	'ngAnimate',
	'angular-loading-bar',
	'utsHelps.constants',
	'angular-alert-banner',
	'utsHelps.UserMessagingService',
	'utsHelps.filter',
	'utsHelps.Help',
	'utsHelps.helpsSearchBar',
	'utsHelps.Sessions'
	])
.config(['$routeProvider', 'cfpLoadingBarProvider', '$httpProvider', function($routeProvider, cfpLoadingBarProvider, $httpProvider){
	$routeProvider.otherwise({redirectTo:'/'});
	cfpLoadingBarProvider.includeSpinner = false;
	$httpProvider.interceptors.push([
		'$injector',
		function ($injector) {
			return $injector.get('AuthInterceptor');
	}]);
}])
.config(['$provide', function($provide) {
  //Provides redirection for
  $provide.decorator('$exceptionHandler', ['$delegate', function($delegate) {
    return function(exception, cause) {
      $delegate(exception, cause);
      throw exception;
  }}]);
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
	function redirect(event, next, current) {
		if (!AuthService.isAuthenticated()) {
			//$location.path("views/autoLoginView.html");
			return AuthService.onCreate().then(function(isLoggedIn) {
				if (isLoggedIn) {
					console.log("user is logged in");
					// All g, continue redirecting
				}
				else {
					if ($location.path()=="/login" || $location.path().match(/register[0-9]*/) != null) {
						//
					}
					else {
						console.log($location.path().match('/register[0-9]*\''));
						$location.path("/login");
					}
				}
			});
		}
	};
	$rootScope.$on("$locationChangeStart", redirect);
	// Redirect if user if they have been logged in and/or logged out
	$rootScope.$on(AUTH_EVENTS.loginSuccess, function(event){
		console.log("login success");
		$location.path("/"); // dashboard
	});
	$rootScope.$on(AUTH_EVENTS.logoutSuccess, function(event) {
		$location.path("/login");
	});
}])
.controller('ApplicationController', ['$scope', 'USER_ROLES', 'AuthService', 'ERR_BROADCASTS', 'AUTH_EVENTS', '$rootScope', 'UserMessagingService', 'Session',
 function($scope, USER_ROLES, AuthService, ERR_BROADCASTS, AUTH_EVENTS, $rootScope, UserMessagingService, Session) {
	$scope.globals = {
		pageTitle: "UTS HELPS"
	};
	UserMessagingService.successAlertBanner("Hello world");
	$scope.Session = Session;
	$scope.err_message = "";
	/*$scope.$on(ERR_BROADCASTS.API_ERROR, function triggerErrorModal(e, err_message) {
		console.log("Error in API! "+err_message);
		$scope.err_message = err_message;
		$("#uh-error-modal").foundation('reveal', 'open');
	});*/
	$scope.triggerCloseModal = function() {
		$("#uh-error-modal").foundation('reveal', 'close');
	}
	$scope.currentUser = null;
	$scope.userRoles = USER_ROLES;
	$scope.isAuthorized = AuthService.isAuthorized;
	$scope.isAuthenticated = AuthService.isAuthenticated;
	$scope.setCurrentUser = function (user) {
		$scope.currentUser = user;
	};
	$scope.logout = function() {
		AuthService.logoutFake().then(function success() {
			$scope.currentUser = null;
			$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
		}, function failure(err) {
			// deal with failure to log out here
			$rootScope.$broadcast(ERR_BROADCASTS.API_ERROR, err);
		});
	};
	$scope.isLoginPage = true;
}]);
