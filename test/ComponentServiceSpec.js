'use strict';

describe('ComponentService', function() {

	beforeEach(function() {
		angular.module('templates', []);
		module('component');
	});

	var dummyData 		= [{'ID': 1, 'title': 'dummy 1'}, {'ID': 2, 'title': 'dummy 2'}, {'ID': 3, 'title': 'dummy 3'}];
	var dummyDataByID   = {'ID': 2, 'title': 'dummy 2'};

	var ComponentService;

	beforeEach(inject(function(_ComponentService_) {
		ComponentService = _ComponentService_;
	}));

	it('Has access to the Service', function() {
		expect(ComponentService).toBeDefined();
	});

	it('Should return an Array of data when calling ComponentService.index()', function() {
		expect(ComponentService.index()).toEqual(dummyData);
	});

	it('Should return a single object when calling ComponentService.byID()', function() {
		expect(ComponentService.byID(2)).toEqual(dummyDataByID);
	});

});
