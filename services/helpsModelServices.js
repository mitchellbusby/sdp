'use strict';

angular.module('helpsModelsServices', [])
.factory('User', function (){
	var fac = {};
	fac.create = function(userId, studentId, name, password) {
		return {
			"userId":userId,
			"studentId":studentId,
			"name":name,
			"password":password
		};
	}
	return fac;
})

.factory('Student', function () {
	var student = {};

	student.create = function (studentId, creatorId, dob, gender, degree, status, 
		firstLanguage, countryOfOrigin, background, degreeDetails, altContact,
		HSC, HSCMarks, IELTS, IELTSMarks, TOELF, TOELFMarks, TAFE,
		TAFEMarks, CULT, CULTMarks, insearchDEEP, insearchDEEPMarks,
		insearchDiploma, insearchDiplomaMarks, foundationCourse,
		foundationCourseMarks) {
			return {
				"studentId":studentId, 
				"creatorId": creatorId, 
				"dob": dob, 
				"gender": gender, 
				"degree": degree, 
				"status": status,
				"firstLanguage": firstLanguage, 
				"countryOfOrigin": countryOfOrigin, 
				"background": background, 
				"degreeDetails": degreeDetails, 
				"altContact": altContact,
				"HSC": HSC, 
				"HSCMarks": HSCMarks, 
				"IELTS": IELTS, 
				"IELTSMarks": IELTSMarks, 
				"TOELF": TOELF, 
				"TOELFMarks": TOELFMarks, 
				"TAFE": TAFE,
				"TAFEMarks": TAFEMarks, 
				"CULT": CULT, 
				"CULTMarks": CULTMarks, 
				"insearchDEEP": insearchDEEP, 
				"insearchDEEPMarks": insearchDEEPMarks,
				"insearchDiploma": insearchDiploma,
				"insearchDiplomaMarks": insearchDiplomaMarks, 
				"foundationCourse": foundationCourse,
				"foundationCourseMarks": foundationCourseMarks
			};
		};
	return student;
})

.factory('Campus', function() {
	var campus = {};
	campus.create = function (campusId, campusInfo, archived) {
		return {
			"campusId": campusId,
			"campusInfo": campusInfo,
			"archived": archived
		};
	}
	
	return campus;
})

.factory('Workshop', function() {
	var workshop = {};
	
	workshop.create = function (workshopId, workshopSetId, 
		campusId, topic, startDate, endDate, description,
		targetingGroup, maximum, cutoff, type, reminderNum,
		reminderSent, daysOfWeek, bookingCount, archived) {
		return {
			"workshopId": workshopId, 
			"workshopSetId": workshopSetId, 
			"campusId": campusId, 
			"topic": topic, 
			"startDate": startDate, 
			"endDate": endDate, 
			"description": description,
			"targetingGroup": targetingGroup, 
			"maximum": maximum, 
			"cutoff": cutoff, 
			"type": type, 
			"reminderNum": reminderNum,
			"reminderSent": reminderSent, 
			"daysOfWeek": daysOfWeek, 
			"bookingCount": bookingCount, 
			"archived": archived
		};
	};
	
	return workshop;
})

.factory('WorkshopSet', function () {
	var workSet = {};
	workSet.create = function (workshopSetId, campusId, name, archived){
		return {
			"workshopSetId": workshopSetId,
			"campusId": campusId,
			"name": name,
			"archived": archived
		}
	};
	return workSet;
})

.factory('WorkshopWaiting', function () {
	var wwaiting = {};
	wwaiting.create = function (workshopWaitingId, workshopId, studentId, userId) {
		return {
			"workshopWaitingId": workshopWaitingId,
			"workshopId": workshopId,
			"studentId": studentId,
			"userId": userId
		}
	};
	return wwaiting;
})