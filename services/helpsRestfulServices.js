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
			this.getResourceFaked = function(resourceUri, params) {
				var data;
				if (resourceUri === endpoint_constants.ACTIVITIES_URI+endpoint_constants.SEARCH_URI) {
					data = {
						"Results": [
						{
							"WorkshopId": 11,
							"topic": "Planning and researching for an assignment",
							"description": "“I have an assignment due soon, but I don’t know where and how to begin.",
							"targetingGroup": "all students",
							"campus": "CB02.05.32",
							"StartDate": "2012-07-07T17:00:00",
							"EndDate": "2012-07-07T18:00:00",
							"maximum": 45,
							"WorkShopSetID": 4,
							"cutoff": null,
							"type": "single",
							"reminder_num": 9999,
							"reminder_sent": 0,
							"DaysOfWeek": null,
							"BookingCount": 45,
							"archived": null
						}, {
							"WorkshopId": 12,
							"topic": "Planning and researching for an assignment",
							"description": "“I have an assignment due soon, but I don’t know where and how to begin.",
							"targetingGroup": "all students",
							"campus": "CB02.05.32",
							"StartDate": "2012-08-07T17:00:00",
							"EndDate": "2012-08-07T18:00:00",
							"maximum": 45,
							"WorkShopSetID": 4,
							"cutoff": null,
							"type": "single",
							"reminder_num": 9999,
							"reminder_sent": 0,
							"DaysOfWeek": null,
							"BookingCount": 44,
							"archived": null
						}, {
							"WorkshopId": 14,
							"topic": "Planning and researching for an assignment",
							"description": "“I have an assignment due soon, but I don’t know where and how to begin.",
							"targetingGroup": "all students",
							"campus": "CB02.05.32",
							"StartDate": "2012-08-07T17:00:00",
							"EndDate": "2012-08-07T18:00:00",
							"maximum": 45,
							"WorkShopSetID": 4,
							"cutoff": null,
							"type": "single",
							"reminder_num": 9999,
							"reminder_sent": 0,
							"DaysOfWeek": null,
							"BookingCount": 45,
							"archived": null
						}, {
							"WorkshopId": 16,
							"topic": "U:PASSwrite for 21129 Managing People & Organisations",
							"description": "This workshop will empower you to write excellent essays and "+
							"provide valuable support for the upcoming assignment.",
							"targetingGroup": "all students",
							"campus": "CB02.05.32",
							"StartDate": "2012-09-07T17:00:00",
							"EndDate": "2012-09-07T18:00:00",
							"maximum": 45,
							"WorkShopSetID": 5,
							"cutoff": null,
							"type": "single",
							"reminder_num": 9999,
							"reminder_sent": 0,
							"DaysOfWeek": null,
							"BookingCount": 44,
							"archived": null
						},
						{
							"WorkshopId": 16,
							"topic": "U:PASSwrite for 21129 Managing People & Organisations",
							"description": "This workshop will empower you to write excellent essays and "+
							"provide valuable support for the upcoming assignment.",
							"targetingGroup": "all students",
							"campus": "CB02.05.32",
							"StartDate": "2012-09-07T17:00:00",
							"EndDate": "2012-09-07T18:00:00",
							"maximum": 45,
							"WorkShopSetID": 9,
							"cutoff": null,
							"type": "single",
							"reminder_num": 9999,
							"reminder_sent": 0,
							"DaysOfWeek": null,
							"BookingCount": 44,
							"archived": null
						},
						{
							"WorkshopId": 16,
							"topic": "U:PASSwrite for 21129 Managing People & Organisations",
							"description": "This workshop will empower you to write excellent essays and "+
							"provide valuable support for the upcoming assignment.",
							"targetingGroup": "all students",
							"campus": "CB02.05.32",
							"StartDate": "2012-09-07T17:00:00",
							"EndDate": "2012-09-07T18:00:00",
							"maximum": 45,
							"WorkShopSetID": 10,
							"cutoff": null,
							"type": "single",
							"reminder_num": 9999,
							"reminder_sent": 0,
							"DaysOfWeek": null,
							"BookingCount": 44,
							"archived": null
						},
						{
							"WorkshopId": 16,
							"topic": "U:PASSwrite for 21129 Managing People & Organisations",
							"description": "This workshop will empower you to write excellent essays and "+
							"provide valuable support for the upcoming assignment.",
							"targetingGroup": "all students",
							"campus": "CB02.05.32",
							"StartDate": "2012-09-07T17:00:00",
							"EndDate": "2012-09-07T18:00:00",
							"maximum": 45,
							"WorkShopSetID": 15,
							"cutoff": null,
							"type": "single",
							"reminder_num": 9999,
							"reminder_sent": 0,
							"DaysOfWeek": null,
							"BookingCount": 44,
							"archived": null
						}
						],
						"IsSuccess": true,
						"DisplayMessage": null
					};
				}
				else if (resourceUri === endpoint_constants.BOOK_SESSION_URI && (params.WorkshopId === 1 || params.workshopId === 11) ) {
					data = {"IsSuccess":false, "DisplayMessage":"Error encountered whilst trying to create your booking. Please try again and if issues persist contact UTS HELPS."};
				}
				else if (resourceUri === endpoint_constants.BOOK_SESSION_URI) {
					data = {"IsSuccess":true, "DisplayMessage":""};
				}
				else {
					console.log("Resource not faked");
					data = null;
				}
				return $q(function(resolve, reject){
					setTimeout(function() {
						if (data) {
							resolve({"data":data});
						}
						else {
							reject({"data":data});
						}
					}, 1000);
				});
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
			this.postResource = function(resourceUri, params) {
				var configObject = this.createConfigObject();
				configObject.params = params;
				return $http.post(endpoint_constants.ENDPOINT_URI+resourceUri, configObject);
			};
			this.postResourceWithParamsInUri = function(resourceUri, params) {
				var configObject = this.createConfigObject();
				var uriTransform = this.transformParams(params);
				return $http({url:endpoint_constants.ENDPOINT_URI+resourceUri+"?"+uriTransform, method: 'POST', headers:configObject['headers']});
			};
		}])
.service('UpcomingActivitiesModel', ['$http', 'helps_endpoint_constants', 'ERR_BROADCASTS', '$rootScope', 'ApiMethods', 'WorkshopBooking', 'AlertBanner', function($http, endpoint_constants, ERR_BROADCASTS, $rootScope, ApiMethods, WorkshopBooking, AlertBanner) {
	var scope = this;

	/*this.create = function(activitiesToSave) {
		scope.activities = activitiesToSave;
	}*/
	this.getDefaultParamsObject = function() {
		return {
			pageNumber: 1,
			pageSize: 100,
		}
	}

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
		scope.params.pageSize++;
		this.getActivities(scope.params).then(function(result) {
			console.log(result);
			scope.activities = scope.mergeActivities(result.data, scope.activities);
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
	
	this.onCreate();
}])
.service('BookingsModel', ['$http', 'helps_endpoint_constants', 'ERR_BROADCASTS', '$rootScope', 'ApiMethods', 'Session', 'CampusesModel', function($http, endpoint_constants, ERR_BROADCASTS, $rootScope, ApiMethods, Session, CampusesModel) {
		var scope = this;

		this.getBookings = function(params) {
			// Gets data from the server
			return ApiMethods.getResource(endpoint_constants.BOOKINGS_URI+endpoint_constants.SEARCH_URI,
				params
			);
		};

		CampusesModel.onCreate();

		this.mergeBookings = function(newDataToMerge, existingData) {
			if (newDataToMerge.IsSuccess) {

				existingData = typeof existingData !== 'undefined' ? existingData : {};

				for (var i=0; i<newDataToMerge["Results"].length; i++) {
                    var bookingID = newDataToMerge["Results"][i]["BookingId"];
					existingData[bookingID] = (newDataToMerge["Results"][i]);
					existingData[bookingID].campus = CampusesModel.campuses[existingData[bookingID].campusID].campus;
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
			this.getBookings({"studentID":Session.userId}).then(function(result) {
				scope.bookings = scope.mergeBookings(result.data);
			});
		};
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
}])
.service('Session', [function () {
	this.create = function (sessionId, userId, username, userRole) {

		this.id = sessionId;
		this.userId = userId;
		this.username = username;
		this.userRole = userRole;
	};
	
	this.destroy = function() {
		this.id = null;
		this.userId = null;
		this.username = null;
		this.userRole = null;
	};
}]);
