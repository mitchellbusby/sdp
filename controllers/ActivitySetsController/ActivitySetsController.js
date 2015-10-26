'use strict';

angular.module('utsHelps.ActivitySets', ['utsHelps.directives', 'helpsRestfulServices', 'ngRoute', 'utsHelps.constants', 'helpsModelsServices'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/activities', {
            templateUrl: 'views/activitySetsView.html',
            controller: 'ActivitySetsCtrl'
        })
    }])
    .controller('ActivitySetsCtrl', ['$scope', 'UpcomingActivitiesModel', 'Session', 'AlertBanner', function($scope, UpcomingActivitiesModel, Session, AlertBanner) {
        $scope.globals.pageTitle = "Activities";
        $scope.UpcomingActivitiesModel = UpcomingActivitiesModel;
    }]);
