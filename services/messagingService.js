angular.module('utsHelps.UserMessagingService', ['utsHelps.constants', 'angular-alert-banner'])
.service('UserMessagingService', ['AlertBanner', '$rootScope', 'ERR_BROADCASTS', "ErrorRegistry", function(AlertBanner, $rootScope, ERR_BROADCASTS, ErrorRegistry){
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
	
}])
.service('ErrorRegistry', [function() {
	this.errorDictionary = {
		"Error encountered whilst trying to create your booking. Please try again and if issues persist contact UTS HELPS.":"Couldn't create booking.",
		"Error creating workshop booking: Booking already exists.":"Booking already exists."
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