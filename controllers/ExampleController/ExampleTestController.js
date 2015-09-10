'use strict';

//This should contain unit tests for example controller :) 


describe('utsHelps.example module', function() {

  beforeEach(module('utsHelps.example'));

  describe('example controller', function(){

    it('should exist and when injected should load', inject(function($controller) {
      //spec body
      var exampleCtrl = $controller('exampleCtrl');
      expect(exampleCtrl).toBeDefined();
    }));

  });
});