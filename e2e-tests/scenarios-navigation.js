// Scenarios-navigation

'use strict';



describe('navigation portion of the page', function() {
	var navPageObject = {}
	beforeEach(function() {
		browser.get('index.html');
		navPageObject.navOpener = element(by.css(".left-off-canvas-toggle"));
	});
	it('should have a username', function() {
		console.log(element(by.css("#nav-username")).getText());
	});
	it('should move into view when clicked', function() {
		navPageObject.navOpener.click();
		expect(element.all(by.css(".off-canvas-wrap .move-right")).count()).toBeAtLeast(1);
	});
});

