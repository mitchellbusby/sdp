'use strict';

angular.module('utsHelps.registerService', function(){})

.service('RegisterService', function() {
	var registerDetails = {};
	
	registerDetails.user = User.create("", "", "", "");
	registerDetails.student = Student.empty();
	
	var setUser = function(newUser) {
		registerDetails.user = newUser;
	};
	
	var getUser = function() { return registerDetails.user; };
	
	var setStudent = function(newStudent) {
		registerDetails.student = newStudent;
	};
	
	var getStudent = function() { return registerDetails.student; };
	
	return {
		setUser: setUser,
		getUser: getUser,
		setStudent: setStudent,
		getStudent: getStudent
	};
});