angular.module('utsHelps.Sessions', ['utsHelps.directives', 'helpsRestfulServices', 'ngRoute', 'utsHelps.constants', 'helpsModelsServices'])
.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/sessions', {
		templateUrl: 'views/sessionsView.html',
		controller: 'SessionsCtrl'
	})
}])
.controller('SessionsCtrl', ['$scope', 'SessionsModel', function($scope, SessionsModel) {
	$scope.globals.pageTitle = "Sessions";
	$scope.SessionsModel = SessionsModel;
}])