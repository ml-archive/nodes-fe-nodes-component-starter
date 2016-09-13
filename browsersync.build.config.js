module.exports = {
	files: ['./dist/component.css', './dist/component.min.js', './index.html'],
	server: {
		baseDir: './docs',
		routes: {
			'/node_modules': 'node_modules',
			'/dist': 'dist'
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
