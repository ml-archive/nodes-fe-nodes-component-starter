'use strict';

describe('TestingService', function() {

	beforeEach(module('Testing'));

	var dummyData 		= [{'ID': 1, 'title': 'dummy 1'}, {'ID': 2, 'title': 'dummy 2'}, {'ID': 3, 'title': 'dummy 3'}];
	var dummyDataByID   = {'ID': 2, 'title': 'dummy 2'};

	var TestingService;

	beforeEach(inject(function(_TestingService_) {
		TestingService = _TestingService_;
	}));

	it('Has access to the Service', function() {
		expect(TestingService).toBeDefined();
	});

	it('Should return an Array of data when calling TestingService.index()', function() {
		expect(TestingService.index()).toEqual(dummyData);
	});

	it('Should return a single object when calling TestingService.byID()', function() {
		expect(TestingService.byID(2)).toEqual(dummyDataByID);
	});

});
