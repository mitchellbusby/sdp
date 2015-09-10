'use strict';


describe('UTS HELPS app', function() {
	browser.get('index.html');
	it ('should automatically redirect to /example when location hash is empty', function() {
		expect(browser.getLocationAbsUrl()).toMatch("/example");
	});
})