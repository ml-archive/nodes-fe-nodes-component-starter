describe('TestingFactory', function() {

	var dummyData 		= [{"ID": 1, "title": "dummy 1"}, {"ID": 2, "title": "dummy 2"}, {"ID": 3, "title": "dummy 3"}];
	var dummyDataByID   = {"ID": 2, "title": "dummy 2"};
	var TestingFactory 	= {};

	beforeEach(function() {
		module('Testing');

		inject(function(_TestingFactory_) {
			TestingFactory = _TestingFactory_;
		});
	});

	it('should return dummy data object', function() {
		expect( TestingFactory.index() ).toEqual(dummyData);
	});

	it('should return dummy data by ID', function() {
		expect( TestingFactory.byID(2) ).toEqual(dummyDataByID);
	});

});