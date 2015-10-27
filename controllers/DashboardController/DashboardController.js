'use strict';

angular.module('utsHelps.Dashboard', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/dashboardView.html',
            controller: 'dashboardCtrl'
        });
    }])
    .controller('dashboardCtrl', ['$scope', 'AlertBanner', 'BookingsModel', function($scope, AlertBanner, BookingsModel) {
        $scope.globals.pageTitle = "UTS HELPS";
        $scope.BookingsModel = BookingsModel;
    }]);