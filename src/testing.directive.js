(function() {
	'use strict';

	angular
		.module('Testing')
		.directive('testingDirective', TestingDirective);

	function TestingDirective() {
		return {
			restrict: 'EA',
			link: link,
			scope: {
				event: '&onEvent',
				data: '='
			},
			templateUrl: 'src/testing.template.html'
		};

		function link(scope, element, attrs) {

			scope.internalValue = true;

			scope.internalDirectiveMethod = function() {
				scope.internalValue = !scope.internalValue;
			}
		}
	}
})();
