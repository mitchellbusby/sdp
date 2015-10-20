'use strict';

angular.module('helpsModelsServices', [])
.factory('User', function (){
	var user = {};
	user.create = function(userId, studentId, name, password) {
		return {
			"userId":userId,
			"studentId":studentId,
			"name":name,
			"password":password
		};
	};
	return user;
})

.factory('Student', function () {
	var student = {};

	student.empty = function() {
		return student.create("", "", "", "", "", "", "", "", "", "", "","", "", "", "", "", "", "","", "", "", "", "","", "", "","");
	};

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
	var workshopSet = {};
	workshopSet.create = function (workshopSetId, campusId, name, archived){
		return {
			"workshopSetId": workshopSetId,
			"campusId": campusId,
			"name": name,
			"archived": archived
		};
	};
	return workshopSet;
})

.factory('WorkshopWaiting', function () {
	var workshopWaiting = {};

	workshopWaiting.create = function (workshopWaitingId, workshopId, studentId, userId) {
		return {
			"workshopWaitingId": workshopWaitingId,
			"workshopId": workshopId,
			"studentId": studentId,
			"userId": userId
		};
	};
	return workshopWaiting;
})

.factory('WorkshopBooking', function () {
	var workshopBooking = {};
	workshopBooking.create = function (workshopBookingId, workshopId, studentId, workshopSetId, userId, isActive) {
		return {
			"workshopBookingId":workshopBookingId,
			"workshopId": workshopId,
			"studentId": studentId,
			"workshopSetId": workshopSetId,
			"userId": userId,
			"isActive": isActive
		};
	};
	return workshopBooking;
})

.factory('Session', function () {
	var session = {};
	session.create = function (sessionId, sessionTypeId, campusId, lecturerId, startDate, endDate, isActive) {
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
	return session;
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

.factory('SessionBooking', function() {
	var sessionBooking = {};
	sessionBooking.create = function(sessionId, bookingId, studentId, userId, isCanceled, assistance, reason, attended, waitingId, isGroup, numPeople, lecturerComment, learningIssuesId, isLocked, assignType, assignTypeOther, subject, appointments, appointmentsOther, assistanceText, archived) {
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
	return sessionBooking;
})

.factory('Waiting', function() {
	var wait = {};
	wait.create = function(waitingId, studentId, bookingId, waitingListId) {
		return {
			"waitingId": waitingId,
			"studentId": studentId,
			"bookingId": bookingId,
			"waitingList": waitingListId
		};
	};
	return wait;
})

.factory('WaitingList', function() {
	var waitingList = {};
	waitingList.create = function (waitingListId, workshopId, numberInList) {
		return {
			"waitingListId": waitingListId,
			"workshopId": workshopId,
			"numberInList": numberInList
		};
	};
	return waitingList;
})

.factory('Notification', function() {
	var notification = {};
	notification.create = function(notificationId, studentId, workshopId, notifyTime, hoursAhead, notificationTypeId) {
		return {
			"notificationId": notificationId,
			"studentId": studentId,
			"workshopId": workshopId,
			"notifyTime": notifyTime,
			"hoursAhead": hoursAhead,
			"notificationTypeId": notificationTypeId,
		};
	};
	return notification;
})
.factory('PostNotification', function() {
	var notification = {};
	notification.create = function(studentId, bookingId, notifyTime, message, bookingTime, mobile) {
		return {
			"notificationTime":notifyTime,
			"notificationMessage":message,
			"userID":studentId,
			"bookingID":bookingId,
			"bookingTime":bookingTime,
			"mobile": mobile
		};
	};
	return notification;
})
.factory('NotificationType', function() {
	var notificationType = {};
	notificationType.create = function(notificationTypeId, abbName, fullName){
		return {
			"notificationTypeId": notificationTypeId,
			"abbName": abbName,
			"fullName": fullName
		};
	};
	return notificationType;
})
