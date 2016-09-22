(function() {
	
	angular.module('demoApp', [
		'nDocs',
		'component'
	]);
	
	angular
		.module('demoApp')
		.controller('demoController', function() {
			var vm = this;
			vm.testValue = 'Greetings from Angular with custom filter!';
			vm.controllerMethod = function(message) {
				console.log(message);
			};
		});
	
})();