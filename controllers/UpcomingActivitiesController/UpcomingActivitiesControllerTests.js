'use strict';

//This should contain unit tests for example controller :) 


describe('utsHelps.UpcomingActivities module', function() {

  beforeEach(module('utsHelps.UpcomingActivities'));
  var $scope, upcomingActivitiesCtrl;
  beforeEach(inject(function($rootScope, $controller){
  	$scope = $rootScope.$new();
  	upcomingActivitiesCtrl = $controller('UpcomingActivitiesCtrl', {
  		$scope:$scope
  	});
  }));

  describe('upcoming activities controller', function(){

    it('should exist and when injected should load', inject(function($controller) {
      //spec body
      //var upcomingActivitiesCtrl = $controller('UpcomingActivitiesCtrl');
      expect(upcomingActivitiesCtrl).toBeDefined();
    }));

  });
});