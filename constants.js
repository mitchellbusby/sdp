angular.module('utsHelps.constants', [])
.constant('ERR_BROADCASTS', {
	"API_ERROR":"API_ERROR"
})
.constant('AUTH_EVENTS', {
	loginSuccess: 'auth-login-sucess',
	loginFailed: 'auth-login-failed',
	logoutSuccess: 'auth-logout-success',
	sessionTimeout: 'auth-session-timeout',
	notAuthenticated: 'auth-not-authenticated',
	notAuthorized: 'auth-not-authorized'
})
.constant('USER_ROLES', {
	all: '*',
	admin: 'admin',
	editor: 'editor',
	guest: 'guest',
	user: 'user'
})
.constant("helps_endpoint_constants", {
	"ENDPOINT_URI":"http://helpstoo.cloudapp.net/api",
	"port":"80",
	"APP_KEY":'123456',
	"ACTIVITIES_URI":"/workshop",
	"SEARCH_URI":"/search",
	"BOOK_SESSION_URI":"/workshop/booking/create",
	"REGISTER_STUDENT_URI":"/api/student/register",
	"BOOKINGS_URI": "/workshop/booking",
	"CAMPUSES_URI": "/misc/campus",
	"CANCEL_BOOKING_URI":"/workshop/booking/cancel",
	"SEARCH_BOOKINGS_URI":"/workshop/booking/search",
    "ADD_WAITLIST_URI":"/workshop/wait/create",
	"BOOKINGS_URI": "/workshop/booking",
	"CAMPUSES_URI": "/misc/campus",
	"GET_STUDENT_URI": "/student/search",
	"GET_NOTIFICATIONS_URI": "/notifications/search",
	"POST_NOTIFICATION_URI": "/notifications",
	"CANCEL_NOTIFICATION_URI":"/notifications/cancel",
})
.constant("notification_times", [
	{title:"10 minutes before", value:10, seconds: (10*60)},
	{title:"30 minutes before", value:30, seconds: (30*60)},
	{title:"1 hour before", value:1, seconds: (60*60)},
	{title:"1 day before", value:24, seconds: (24*60*60)},
	{title:"7 days before", value:7, seconds: (7*24*60*60)},

]);