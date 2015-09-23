'use script';

describe('utsHelps.login module', function () {
	beforeEach(module('utsHelps.login'));
	
	describe('login controller', function () {
		
		it('should exist and when injected should load', inject(function($controller) {
			var loginControl = $controller('loginCtrl');
			expect(loginControl).toBeDefined();
		}));
	});

});