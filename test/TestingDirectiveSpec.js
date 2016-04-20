'use strict';

describe('TestingDirecctive', function() {

	beforeEach(module('Testing'));

	beforeEach(module('src/testing.template.html'));

	var $compile, $rootScope, scope, element;

	beforeEach(inject(function(_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;

		scope = $rootScope.$new();

		scope.controllerValue = 'value';
		scope.controllerMethod = angular.noop;

		var html = '<testing-directive on-event="controllerMethod()" data="controllerValue"></testing-directive>';

		element = $compile(html)(scope);
		scope.$apply();

	}));

	it('compiles the template with a value from the parent scope', function() {
		expect(element.html()).toContain('value');
	});

	it('calls the method from the parent controller', function() {

		spyOn(scope, 'controllerMethod');

		element.find('button')[0].click();

		expect(scope.controllerMethod).toHaveBeenCalled();

	});

});
