angular.module('utsHelps.UserMessagingService', ['utsHelps.constants', 'angular-alert-banner'])
.service('UserMessagingService', ['AlertBanner', '$rootScope', 'ERR_BROADCASTS', "ErrorRegistry", "AUTH_EVENTS", function(AlertBanner, $rootScope, ERR_BROADCASTS, ErrorRegistry, AUTH_EVENTS){
	var scope = this;
	this.errorAlertBanner = function(message) {
		AlertBanner.publish({
			type: "error",
			message: message,
			timeCollapse: 3000
		});
	}
	$rootScope.$on(ERR_BROADCASTS.API_ERROR, function(e, err_msg) {
		console.log("ALERT BANNER SHOULD HAVE FIRED");
		var friendlyError = ErrorRegistry.retrieveFriendlyError(err_msg);
		scope.errorAlertBanner(friendlyError);
	});
	$rootScope.$on(AUTH_EVENTS.loginFailed, function(e, err_msg) {
		scope.errorAlertBanner("Your login details were incorrect. Try again.");
	});
}])
.service('ErrorRegistry', [function() {
	this.errorDictionary = {
		"Error encountered whilst trying to create your booking. Please try again and if issues persist contact UTS HELPS.":"Couldn't create booking.",
		"Error creating workshop booking: Booking already exists.":"Booking already exists.",
		"Error creating workshop booking: Workshop has reached cut-off for bookings.":"Workshop has reached cut-off for bookings"
	}
	this.retrieveFriendlyError = function(message) {
		if (message in this.errorDictionary) {
			return this.errorDictionary[message];
		}
		else {
			return "Unknown error. Contact UTS ITD.";
		}
	}
}])