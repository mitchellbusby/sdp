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
	};
	
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
		};
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
		};
	};
	return wwaiting;
})

.factory('WorkShopBookings', function () {
	var wBooking = {};
	wBooking.create = function (workshopBookingId, workshopId, studentId, workshopSetId, userId, isActive) {
		return {
			"workshopBookingId":workshopBookingId, 
			"workshopId": workshopId, 
			"studentId": studentId, 
			"workshopSetId": workshopSetId, 
			"userId": userId, 
			"isActive": isActive
		};
	};
	return wBooking;
})

.factory('Session', function () {
	var sess = {};
	sess.create = function (sessionId, sessionTypeId, campusId, lecturerId, startDate, endDate, isActive) {
		return {
			"sessionId": sessionId,
			"sessionTypeId": sessionTypeId,
			"campusId": campusId,
			"lecturerId": lecturerId,
			"startDate": startDate,
			"endDate": endDate,
			"isActive": isActive
			};
	};
	return sess;
})

.factory('SessionType', function (){
	var type = {};
	type.create = function(sessionTypeId, abbName, fullName, isCurrent, isActive) {
		return {
			"sessionTypeId": sessionTypeId,
			"abbName": abbName,
			"fullName": fullName,
			"isCurrent": isCurrent,
			"isActive": isActive
		};
	};
	return type;
})

.factory('SessionBookings', function() {
	var sessbooking = {};
	sessbooking.create = function(sessionId, bookingId, studentId, userId, isCanceled, assistance, reason, attended, waitingId, isGroup, numPeople, lecturerComment, learningIssuesId, isLocked, assignType, assignTypeOther, subject, appointments, appointmentsOther, assistanceText, archived) {
		return {
			"sessionId": sessionId, 
			"bookingId": bookingId, 
			"studentId": studentId, 
			"userId": userId, 
			"isCanceled": isCanceled, 
			"assistance": assistance, 
			"reason": reason, 
			"attended": attended, 
			"waitingId": waitingId, 
			"isGroup": isGroup, 
			"numPeople": numPeople, 
			"lecturerComment": lecturerComment, 
			"learningIssuesId": learningIssuesId, 
			"isLocked": isLocked, 
			"assignType": assignType, 
			"assignTypeOther": assignTypeOther, 
			"subject": subject, 
			"appointments": appointments, 
			"appointmentsOther": appointmentsOther, 
			"assistanceText": assistanceText, 
			"archived": archived
		};
	};
	return sessbooking;
})

.factory('Waiting', function() {
	var wait = {};
	wait.create = function(waitingId, studentId, bookingId, waitingListId) {
		return {
			"waitingId": waitingId,
			"studentId": studentId,
			"bookingId": bookingId,
			"waitinglist": waitingListId
		};
	};
	return wait;
})

.factory('WaitingList', function() { 
	var waitList = {};
	waitList.create = function (waitingListId, workshopId, numberInList) {
		return {
			"waitingListId": waitingListId,
			"workshopId": workshopId,
			"numberInList": numberInList
		};
	};
	return waitList;
})

.factory('Notification', function() {
	var noti = {};
	noti.create = function(notificationId, studentId, workshopId, notifyTime, hoursAhead) {
		return {
			"notificationId": notificationId,
			"studentId": studentId,
			"workshopId", workshopId,
			"notifyTime": notifyTime,
			"hoursAhead": hoursAhead
		};
	};
	return noti;
})