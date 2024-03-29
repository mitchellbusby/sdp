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
	it('should expand when I click on one of the activities', function() {
		var listOfActivities = element.all(by.repeater('activity in UpcomingActivitiesModel.activities'));
		var firstActivity = listOfActivities.get(0);
		firstActivity.click();
		var expandedContent = element(by.css('.expanded-content'));
		var expandedContentElement = firstActivity.element(expandedContent.locator());
		expect(expandedContentElement.isDisplayed()).toBeTruthy();
	});
});

afterEach(function() {

});