(function() {
	'use strict';

	angular
		.module('Testing', ['templates']);

	/**
	 * Used by gulp-angular-templates
	 * to inline the templates in the production code
	 */
	angular
		.module('templates', []);
})();