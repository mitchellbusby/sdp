'use strict';

angular.module('utsHelps.example', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/example', {
    templateUrl: 'views/exampleView.html',
    controller: 'exampleCtrl'
  });
}])

.controller('exampleCtrl', [function() {

}]);