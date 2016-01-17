angular
	.module('Testing')
	.factory('TestingFactory', TestingFactory);

function TestingFactory() {
	var response 	= {"data": [{"ID": 1, "title": "dummy 1"}, {"ID": 2, "title": "dummy 2"}, {"ID": 3, "title": "dummy 3"}]};
	var data 		= response.data;

	return {
		index	: index,
		byID	: byID
	};

	function index() {
		return data;
	}

	function byID(ID) {
		return data.filter(function(item) {
			return item.ID === ID;
		})[0];
	}
}