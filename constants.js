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
	"BOOK_SESSION_URI":"/workshop/booking/create"
});