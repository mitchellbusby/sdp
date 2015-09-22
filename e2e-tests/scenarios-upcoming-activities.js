'use strict'



describe('upcoming activities page', function() {

	beforeEach(function() {
		browser.get('index.html#/upcomingActivities');
	});

	it('should have some upcoming activities', function() {
		//Control 
		//Assertions
		var listOfActivities = element.all(by.repeater('activity in UpcomingActivitiesModel.activities'));
		expect(listOfActivities.count()).toBeAtLeast(1);

	});
});

afterEach(function() {

});