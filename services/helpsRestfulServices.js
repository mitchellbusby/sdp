'use strict';

angular.module('helpsRestfulServices', ['utsHelps.constants', 'helpsModelsServices'])
.config(['$sceDelegateProvider', 'helps_endpoint_constants', function($sceDelegateProvider, helps_endpoint_constants) {
	// Resolves the long wait for the OPTIONS pre flight request; very much a hack
	// and is not supported by the CORS official spec: http://stackoverflow.com/a/16570604
	$sceDelegateProvider.resourceUrlWhitelist(['self',
		helps_endpoint_constants.ENDPOINT_URI+'/**']);
}])
.service('ApiMethods', ['$http', 'helps_endpoint_constants', 'ERR_BROADCASTS', '$rootScope', '$q',
	function($http, endpoint_constants, ERR_BROADCASTS, $rootScope, $q) {
		this.createConfigObject = function() {
				//Factory method pattern
				var configObject = {
					headers: {
						"AppKey":endpoint_constants.APP_KEY
					}
				};
				return configObject;
        };
			this.getResource = function(resourceUri, params) {
				// Given the resource URI (not including the endpoint URI), and parameters, call the endpoint
				// and return a promise
				var configObject = this.createConfigObject();
				configObject["params"] = params;
				return $http.get(endpoint_constants.ENDPOINT_URI+resourceUri, configObject);
			};
			this.getResourceWithParamsInURI = function(resourceUri, params) {
				// Given the resource URI and parameters, call the end point and return a promise
				// Do it with the parameters in the uri
				var configObject = this.createConfigObject();
				var uriTransform = this.transformParams(params);
				return $http.get(endpoint_constants.ENDPOINT_URI+resourceUri+"?"+uriTransform, configObject);
			};
			this.transformParams = function(params) {
				// This bit of code circumvents the issue whereby Angular doesn't support
				// URI params for POST calls - for obvious security reasons. However,
				// ITD have decided that security is not important so eschewed this important
				// safety measure.
				// Enclosed in a try catch because if there is no return, things get ugly.
				try {
					if (params === undefined) {return params;}
					else {return $.param(params);}
				}
				catch(err) {
					return params;
				}

			};
			this.postResource = function(resourceUri, data) {
				var configObject = this.createConfigObject();
				//return $http.post(endpoint_constants.ENDPOINT_URI+resourceUri, configObject);
				return $http.post(endpoint_constants.ENDPOINT_URI+resourceUri, data, configObject);
			};
			this.postResourceWithParamsInUri = function(resourceUri, params) {
				var configObject = this.createConfigObject();
				var uriTransform = this.transformParams(params);
				return $http({url:endpoint_constants.ENDPOINT_URI+resourceUri+"?"+uriTransform, method: 'POST', headers:configObject['headers']});
			};
			this.putResource = function(resourceUri, data) {
				var configObject = this.createConfigObject();
				return $http.put(endpoint_constants.ENDPOINT_URI+resourceUri, data, configObject);
			}
		}])
.service('UpcomingActivitiesModel', ['$http', 'helps_endpoint_constants', 'ERR_BROADCASTS', '$rootScope', 'ApiMethods', 'WorkshopBooking', 'AlertBanner', function($http, endpoint_constants, ERR_BROADCASTS, $rootScope, ApiMethods, WorkshopBooking, AlertBanner) {
	var scope = this;

	/*this.create = function(activitiesToSave) {
		scope.activities = activitiesToSave;
	}*/
	this.getDefaultParamsObject = function() {
		return {
			page: 1,
			pageSize: 100,
			StartingDtBegin: moment().format("YYYY-MM-DDTHH:mm:ss"),
			StartingDtEnd: "9997-12-29T17:00:00"
		}
	};

	scope.params = this.getDefaultParamsObject();

	this.getActivities = function(params) {
		// Gets data from a server
		return ApiMethods.getResource(endpoint_constants.ACTIVITIES_URI+endpoint_constants.SEARCH_URI,
			params
			);
	};

	this.mergeActivities = function(newDataToMerge, existingData) {
		if (newDataToMerge.IsSuccess) {
			if (!existingData) {
				var existingData = {};
			}
			for (var i=0; i<newDataToMerge["Results"].length; i++){
				if (existingData.hasOwnProperty(newDataToMerge["Results"][i]["WorkShopSetID"])) {
					// Append all workshop deets and whatnot into the workshop
					existingData[newDataToMerge["Results"][i]["WorkShopSetID"]]["workshops"].push(newDataToMerge["Results"][i]);
				}
				else {
					existingData[newDataToMerge["Results"][i]["WorkShopSetID"]] = {
						"description":newDataToMerge["Results"][i]["description"],
						"topic":newDataToMerge["Results"][i]["topic"],
						"workshops":[newDataToMerge["Results"][i]]
					};
				}
			}
			return existingData;
		}
		else {
			// Failed to correctly load data
			console.log("Failed to correctly load data.");
			$rootScope.$broadcast(ERR_BROADCASTS.API_ERROR, newDataToMerge.DisplayMessage);
			return {};
		}
	};

	this.getMoreActivities = function(){
		scope.params.page = scope.params.page+1;
		return this.getActivities(scope.params).then(function(result) {
			console.log(result);
			scope.activities = scope.mergeActivities(result.data, scope.activities);
			if (result.data.Results.length < 1) {
				return false;
			}
			else {
				return true;
			}
		});
	};

	this.onCreate = function() {

        //modified from mitch's code.
        //Using page number, instead of a date, to get activities
		this.getActivities(scope.params).then(function(result) {
		//this.getActivities({"StartingDtBegin":"2015-08-07T17:00:00", "StartingDtEnd":"9999-12-29T17:00:00"}).then(function(result) {
			console.log(result);
			scope.activities = scope.mergeActivities(result.data, scope.activities);
		});
	};
	this.refresh = function() {
		scope.activities = null;
		scope.params.page = 1;
		scope.onCreate();
	};
	this.bookWorkshop = function(workshopId, studentId) {
		//Create a nice model to send to the DB
		// This method could be ported to Tomm's model tbh
		var workshopBooking = WorkshopBooking.create(null, workshopId, studentId, null, studentId, null);
		return ApiMethods.postResourceWithParamsInUri(endpoint_constants.BOOK_SESSION_URI, workshopBooking).then(function success(response) {
			if (response.data.IsSuccess) {
				return true;
			}
			else {
				$rootScope.$broadcast(ERR_BROADCASTS.API_ERROR, response.data.DisplayMessage);
				return false;
			}
		}, function failure(error) {
			// Bit of error handling
			$rootScope.$broadcast(ERR_BROADCASTS.API_ERROR, "Error encountered whilst trying to create your booking. Please try again and if issues persist contact UTS HELPS.");
		});
	};
	this.cancelWorkshop = function(workshopId, studentId) {
		var cancelModel = {"workshopId":workshopId, "studentId":studentId, "userId": studentId};
		return ApiMethods.postResourceWithParamsInUri(endpoint_constants.CANCEL_BOOKING_URI, cancelModel).then(function success(response){
			// What to do if it worked
			if (response.data.IsSuccess) {
				return true;
			}
			else {
				$rootScope.$broadcast(ERR_BROADCASTS.API_ERROR, response.data.DisplayMessage);
				return false;
			}
		},
		function fail(response) {
			$rootScope.$broadcast(ERR_BROADCASTS.API_ERROR, "Error encountered whilst trying to cancel your booking. Please try again and if issues persist contact UTS HELPS.");
		});
	};
    this.addToWaitlist = function(workshopId, studentId){
        var waiting = {
            "workshopId":workshopId,
            "studentId":studentId,
            "userId":studentId,
            "priority":null
        };
        return ApiMethods.postResourceWithParamsInUri(endpoint_constants.ADD_WAITLIST_URI, waiting).then(function success(response) {
            if (response.data.IsSuccess) {
                return true;
            }
            else {
                $rootScope.$broadcast(ERR_BROADCASTS.API_ERROR, response.data.DisplayMessage);
                return false;
            }
        }, function failure(error){
                $rootScope.$broadcast(ERR_BROADCASTS.API_ERROR, "Error encountered whilst trying to add yourself to waitlist. Please try again and if issues persist contact UTS HELPS.");
        });
    };
	this.onCreate();
}])
.service('StudentRegisterService', ['Session', '$rootScope', 'ApiMethods', 'helps_endpoint_constants', 'ERR_BROADCASTS', 'UserMessagingService', function(Session, $rootScope, ApiMethods, endpoint_constants, ERR_BROADCASTS, UserMessagingService){
	this.registerStudent = function(student, then) {
		// Use the nice model we've been given (it's all in JSON) to register a
		// student
		return ApiMethods.postResource(endpoint_constants.REGISTER_STUDENT_URI, student).then(function success(response) {
			if (response.data.IsSuccess) {
				then();
				return true;
			} else {
				console.log(response.data.DisplayMessage);
				$rootScope.$broadcast(ERR_BROADCASTS.API_ERROR, "Error encountered whilst trying to register your details. Please try again and if issues persist contact UTS HELPS.");
				return false;
			}
		});
	};
}])
.service('BookingsModel', ['$http', 'helps_endpoint_constants', 'ERR_BROADCASTS', '$rootScope', 'ApiMethods', 'Session', 'CampusesModel', function($http, endpoint_constants, ERR_BROADCASTS, $rootScope, ApiMethods, Session, CampusesModel) {
		var scope = this;

		scope.params = {
			pageSize: 1000
		};

		this.getBookings = function(params) {
			// Gets data from the server
			params.pageSize = scope.params.pageSize;
			return ApiMethods.getResource(endpoint_constants.BOOKINGS_URI+endpoint_constants.SEARCH_URI,
				params
			);
		};


		this.mergeBookings = function(newDataToMerge, existingData) {
			if (newDataToMerge.IsSuccess) {

				existingData = typeof existingData !== 'undefined' ? existingData : {};

				for (var i=0; i<newDataToMerge["Results"].length; i++) {
					var booking = newDataToMerge["Results"][i];

					if (typeof booking.BookingArchived != "string") {
						var bookingID = booking["BookingId"];
						existingData[bookingID] = (newDataToMerge["Results"][i]);
						existingData[bookingID].campus = CampusesModel.campuses[existingData[bookingID].campusID].campus;
					}
				}

				return existingData;
			}
			else {
				// Failed to correctly load data
				console.log("Failed to correctly load data.");
				$rootScope.$broadcast(ERR_BROADCASTS.API_ERROR, newDataToMerge.DisplayMessage);
				return {};
			}
		};

		this.bookingsArray = function () {
			if (typeof scope.bookings !== 'undefined') {
				return $.map(scope.bookings, function(value) {
					return [value];
				});
			}
			else {
				return [];
			}
		};

		this.isUpcomingBooking = function (booking) {
			var startDate = new Date(booking.starting);
			var now = new Date();
			return now < startDate;
		};

		this.isPastBooking = function (booking) {
			return !scope.isUpcomingBooking(booking);
		};

		this.onCreate = function() {
			setTimeout(function() {
				scope.getBookings({"studentID":Session.userId}).then(function(result) {
					scope.bookings = scope.mergeBookings(result.data);
				});
			}, 2000);
		};
		this.refresh = function() {
			scope.bookings = {};
			this.onCreate();
		};
		this.bookingExists = function(workshop) {
			//Checks if booking exists for a workshop
			var workshopId = workshop.WorkshopId;
			for (var bookingId in scope.bookings) {
				if (scope.bookings[bookingId].workshopID === workshopId && scope.bookings[bookingId].BookingArchived === null) {
					return true;
				}
			}
			return false;
		};
		this.getBooking = function(workshop) {
			var workshopId = workshop.WorkshopID;
			for (var bookingId in scope.bookings) {
				if (scope.bookings[bookingId].workshopID === workshopId && scope.bookings[bookingId].BookingArchived === null) {
					return scope.bookings[bookingId];
				}
			}
			return -1;
		};
		this.bookingFromId = function(bookingId) {
			return scope.bookings[bookingId];
		};
		this.saveNote = function(booking) {
			var updatedBooking = {
				notes: booking.notes,
				WorkshopId: booking.workshopID,
				UserId: Session.userId,
				StudentId: Session.userId
			};
			return ApiMethods.putResource(endpoint_constants.UPDATE_BOOKING_URI, updatedBooking)
			// Need to create a put method
		}
		this.onCreate();
}])
.service('CampusesModel', ['$http', 'helps_endpoint_constants', 'ERR_BROADCASTS', '$rootScope', 'ApiMethods', function($http, endpoint_constants, ERR_BROADCASTS, $rootScope, ApiMethods) {
    var scope = this;

    this.getCampuses = function() {
        return ApiMethods.getResource(endpoint_constants.CAMPUSES_URI);
    };

    this.mergeCampuses = function (newDataToMerge, existingData) {
        if (newDataToMerge.IsSuccess) {
            existingData = typeof existingData !== 'undefined' ? existingData : {};

            for (var i=0; i<newDataToMerge["Results"].length; i++) {
                existingData[newDataToMerge["Results"][i]["id"]] = (newDataToMerge["Results"][i]);
            }

            return existingData;
        }
        else {
            // Failed to correctly load data
            console.log("Failed to correctly load data.");
            $rootScope.$broadcast(ERR_BROADCASTS.API_ERROR, newDataToMerge.DisplayMessage);
            return {};
        }
    };

    this.onCreate = function() {
        this.getCampuses().then(function (result) {
            scope.campuses = scope.mergeCampuses(result.data);
        });
    };
	this.onCreate();
}])
.service('Session', [function () {
	this.create = function (sessionId, userId, username, userRole, mobile) {
		this.id = sessionId;
		this.userId = userId;
		this.username = username;
		this.userRole = userRole;
		this.mobile = mobile;
	};

	this.destroy = function() {
		this.id = null;
		this.userId = null;
		this.username = null;
		this.userRole = null;
		this.mobile = null;
	};
}])
.service('WorkshopBookingsServiceMitchell', ['WorkshopBooking', 'Session', 'ApiMethods', 'helps_endpoint_constants', function(WorkshopBooking, Session, ApiMethods, endpoint_constants) {
	var vm = this;
	vm.Bookings = [];
	this.onCreate = function() {
		ApiMethods.getResource(endpoint_constants.SEARCH_BOOKINGS_URI, {"studentId":Session.userId, "pageSize":2000}).then(function(result){
			if (result.data.IsSuccess) {
				vm.Bookings = result.data.Results;
			}
			else {
				// Error messaging
			}
		});
	};
	this.bookingExists = function(workshop) {
		//Checks if booking exists for a workshop
		var workshopId = workshop.WorkshopId;
		for (var i=0; i<vm.Bookings.length; i++) {
			if (vm.Bookings[i].workshopID === workshopId && vm.Bookings[i].BookingArchived===null) {
				return true;
			}
		}
		return false;
	};
	this.getBooking = function(workshop) {
		var workshopId = workshop.WorkshopId;
		for (var i=0; i<vm.Bookings.length; i++) {
			if (vm.Bookings[i].workshopID === workshopId) {
				return vm.Bookings[i];
			}
		}
		return -1;
	};
	this.refresh = function() {
		vm.Bookings = [];
		vm.onCreate();
	};
	vm.onCreate();
}])
.service('NotificationsModel', ['ApiMethods', 'Session', 'helps_endpoint_constants', 'notification_times', function(ApiMethods, Session, endpoint_constants, notification_times) {
	var vm = this;
	vm.notifications = {};
	vm.getNotificationsForUser = function() {
		var params = {"studentId": Session.userId};
		ApiMethods.getResource(endpoint_constants.GET_NOTIFICATIONS_URI, params)
			.then(function success(response) {
				vm.mergeNotifications(vm.notifications, response.data.Results);
		});
	};
	vm.mergeNotifications = function(existingNotifications, newNotifications) {
		for (var i=0; i<newNotifications.length; i++) {
			if (newNotifications[i].bookingID in existingNotifications) {
				// Don't add
			}
			else {
				existingNotifications[newNotifications[i].bookingID] = newNotifications[i];
			}
		}
	};
	vm.notificationExists = function(bookingId) {
		if (bookingId in vm.notifications) {
			return true;
		}
		else {
			return false;
		}
	};
	vm.add = function(notificationToBeSent) {
		// Do nothing so far
		//shift the thing
		var notificationTimeId = notificationToBeSent.notificationTime.toString();
		notificationToBeSent.notificationTime = vm.applyTimeShiftToNotification(notificationToBeSent.notificationTime, notificationToBeSent.bookingTime);
		notificationToBeSent.notificationMessage = vm.generateMessage(notificationToBeSent, notificationTimeId, notificationToBeSent.notificationTime);
		return ApiMethods.postResource(endpoint_constants.POST_NOTIFICATION_URI, notificationToBeSent).
			then(function success(response){
				if (response.data.IsSuccess) {
					return true;
				}
				else {
					return false;
				}
		});
	};
	vm.applyTimeShiftToNotification = function(notificationTimeId, bookingTime) {
        var constant = notification_times.filter(function (notification_constant) {
            return notification_constant.value == notificationTimeId;
        });

        var time = moment(bookingTime);
        var timeToNotify = time.subtract(constant[0].seconds, 'seconds');
        var result = timeToNotify.format("YYYY-MM-DDTHH:mm:ss");
        return result;
	};
	vm.generateMessage = function(notification, notificationTimeId, notificationTime) {
		console.log(notificationTimeId);
		var constant = notification_times.filter(function (notification_constant) {
			return notification_constant.value == notificationTimeId;
		})[0];
		var workshopTime = moment(notificationTime).format('dddd Do MMMM YYYY, h:mm:ss a');;
		return "Reminder from UTS HELPS: You have a HELPS workshop in "+ constant.msg +" ("+
		workshopTime+").";
	}
	vm.refresh = function() {
		vm.notifications = {};
		vm.getNotificationsForUser();
	};
	vm.onCreate = function() {
		setTimeout(vm.getNotificationsForUser, 1000);
	};
	vm.cancelNotification = function(notificationID) {
		var params = {"notificationID":notificationID};
		return ApiMethods.getResource(endpoint_constants.CANCEL_NOTIFICATION_URI, params)
			.then(function success(response) {
				if (response.data.IsSuccess) {
					return true;
				}
				else {
					return false;
				}
			});
	};
	vm.getNotificationByBookingId = function(bookingID) {
		if (bookingID in vm.notifications) {
			return vm.notifications[bookingID];
		}
		else {
			return -1;
		}
	}
	vm.testNotification = function(notificationId) {
		var params = {id: notificationId};
		return ApiMethods.getResource(endpoint_constants.TEST_NOTIFICATION_URI, params).
			then(function success(response) {
				if (response.data.IsSuccess) {
					return true;
				}
				else {
					return false;
				}
			});
	}
	vm.onCreate();
}]);
