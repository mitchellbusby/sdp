'use strict';

describe('helps restful services tests', function() {
	beforeEach(module('helpsRestfulServices'));


	describe('upcoming activities service model', function() {
		var upcomingActivitiesService;
		var $httpBackend;
		var ApiMethods;
		var endpoint_constants;
		beforeEach(inject(function(_UpcomingActivitiesModel_, $injector) {
			upcomingActivitiesService = _UpcomingActivitiesModel_;
			$httpBackend = $injector.get('$httpBackend');
			ApiMethods = $injector.get('ApiMethods');
			endpoint_constants = $injector.get('helps_endpoint_constants');
		}));

		it('should be defined when loaded', function() {
			expect(upcomingActivitiesService).toBeDefined();
		});
		it('should be able to sort through and merge two sets of activities', function() {
			upcomingActivitiesService.onCreate();
			ApiMethods.getResourceFaked(endpoint_constants.ENDPOINT_URI+endpoint_constants.SEARCH_URI).then(function(data) {
				expect(data.shouldBeDefined());
			});
		});

	});

});