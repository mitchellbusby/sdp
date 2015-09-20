'use strict';

angular.module('helpsRestfulServices', ['utsHelps.constants'])
.constant("helps_endpoint_constants", {
	"ENDPOINT_URI":"http://helpshere.cloudapp.net/api",
	"port":"80",
	"APP_KEY":'123456',
	"ACTIVITIES_URI":"/workshop",
	"SEARCH_URI":"/search"
})
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
			}
			this.getResource = function(resourceUri, params) {
				// Given the resource URI (not including the endpoint URI), and parameters, call the endpoint
				// and return a promise
				var configObject = this.createConfigObject();
				configObject["params"] = params;
				return $http.get(endpoint_constants.ENDPOINT_URI+resourceUri, configObject);
			}
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
							"BookingCount": 44,
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
							"BookingCount": 44,
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
						}
						],
						"IsSuccess": true,
						"DisplayMessage": null
					};
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
			}
		}])
.service('UpcomingActivitiesModel', ['$http', 'helps_endpoint_constants', 'ERR_BROADCASTS', '$rootScope', 'ApiMethods', function($http, endpoint_constants, ERR_BROADCASTS, $rootScope, ApiMethods) {
	var scope = this;
	/*this.create = function(activitiesToSave) {
		scope.activities = activitiesToSave;
	}*/
	this.getActivities = function(params) {
		// Gets data from a server
		return ApiMethods.getResource(endpoint_constants.ACTIVITIES_URI+endpoint_constants.SEARCH_URI, 
			params
			);
	}
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
	}
	this.onCreate = function() {
		this.getActivities({"startingDtBegin":"2012-08-07T17:00:00"}).then(function(result) {
			console.log(result);
			scope.activities = scope.mergeActivities(result.data);
		});
	};
	this.onCreate();
}]);
