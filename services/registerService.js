'use strict';

angular.module('utsHelps.registerService', ['ngRoute'])

.service('RegisterService', ['$location', 'User', 'Student',
function($location, User, Student) {
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

	var goRegisterPageOne = function() { $location.path('/register1') };
	var goRegisterPageTwo = function () { $location.path('/register2') };
	var goRegisterPageThree = function() { $location.path('/register3') };

	var setUserFromLogin = function (username, password) {
		registerDetails.user.userName = username;
		registerDetails.user.password = password;
	};

	return {
		setUser: setUser,
		getUser: getUser,
		setStudent: setStudent,
		getStudent: getStudent,
		goRegisterPageOne: goRegisterPageOne,
		goRegisterPageTwo: goRegisterPageTwo,
		goRegisterPageThree: goRegisterPageThree,
		setUserFromLogin: setUserFromLogin,
	};
}]);
