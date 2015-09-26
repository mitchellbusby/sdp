'use strict';

//This should contain unit tests for example controller :) 


describe('utsHelps.example module', function() {
	beforeEach(module('utsHelps.example'));
	var $scope, exampleCtrl;
	beforeEach(inject(function($rootScope, $controller){
		$scope = $rootScope.$new();
		$scope.globals = {};
		exampleCtrl = $controller('exampleCtrl', {
			$scope:$scope,
		});
	}));
	describe('example controller', function(){
	it('should exist and when injected should load', inject(function($controller) {
      //spec body
      expect(exampleCtrl).toBeDefined();
  	}));
	});
});