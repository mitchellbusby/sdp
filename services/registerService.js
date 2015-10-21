'use strict';

angular.module('utsHelps.registerService', ['ngRoute'])

.service('RegisterService', ['$location', 'User', 'Student',
	'StudentRegisterService', 'ApiMethods', 'helps_endpoint_constants', 'UserMessagingService',
function($location, User, Student, StudentRegisterService, ApiMethods, endpoint_constants,
	UserMessagingService) {
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

	var goRegisterPageOne = function () { $location.path('/register1')	};
	var goRegisterPageTwo = function () { $location.path('/register2') };
	var goRegisterPageThree = function() { $location.path('/register3') };

	var isStudentRegistered = function(studentId)
	{
		 var json = { "studentId": studentId };
		 ApiMethods.postResourceWithParamsInUri(endpoint_constants.SEARCH_STUDENT, json).then(function (result) {
			 console.log(result.data);
			 if (result.data.IsSuccess) {
				 if (result.data.IsRegistered) {
					 return true;
				 } else {
				 	 $rootScope.$broadcast(ERR_BROADCASTS.API_ERROR, response.data.DisplayMessage);
					 return false;
				 }
			 } else {

				 $rootScope.$broadcast(ERR_BROADCASTS.API_ERROR, response.data.DisplayMessage);
				 return false;
			 }
		 });
	};

	var setUserFromLogin = function (username, password) {
		registerDetails.user.name = username;
		registerDetails.user.password = password;
	};

	var registerUserDetails = function () {
		console.log("about to call StudentRegisterService.registerStudent");
		if (StudentRegisterService.registerStudent(registerDetails.student,
			function () {
				$location.path('/login');
				registerDetails.student = null;
				registerDetails.user = null;
			}))
		{
			UserMessagingService.successAlertBanner("Successfully registered.");
			console.log("Successfully registered");
		} else {
			// something went wrong. Error is broadcast elsewhere, so just leave it
		}
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
		registerUserDetails: registerUserDetails,
		isStudentRegistered: isStudentRegistered,
	};
}]);
