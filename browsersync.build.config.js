module.exports = {
	files: ['./dist/component.css', './dist/component.min.js', './index.html'],
	server: {
		baseDir: './',
		routes: {
			'/node_modules': 'node_modules'
		}
	},
	rewriteRules: [
		{
			match: /component.js/g,
			fn: function (req, res, match) {
				return 'component.min.js';
			}
		}
	],
	https: true
};
