'use strict';

angular.module('helpsRestfulServices', [])
.constant('ENDPOINT_URI', "WhateverOurEndpointIs")
.constant('')
.service('UpcomingActivitiesModel', ['$http', function($http) {
	var scope = this;
	this.create = function(activitiesToSave) {
		scope.activities = activitiesToSave;
	}
	this.getActivities = function() {
		return scope.activities;
	}
	this.updateActivities = function(callback) {
		// Do nothing for now
		//$http.get(ENDPOINT_URI+)
		var data = {
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
			          "description": "“I have an assignment due soon, but I don’t know where and how to begin.",
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
		// Reshape the data
		var result = this.mergeActivities(data);
		//scope.activities = result;
		callback(result);
	}
	this.paginateActivities = function(numberOfResultsPerPage, pageNumber, callback) {
		// TODO
	}
	this.mergeActivities = function(newDataToMerge, existingData) {
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
	this.updateActivities(scope.create);
}]);
