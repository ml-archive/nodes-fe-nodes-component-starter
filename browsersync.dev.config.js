module.exports = {
	files: ['./dist/component.css', './dist/component.js', './index.html'],
	server: {
		baseDir: '.',
		routes: {
			'/node_modules': 'node_modules'
		}
	},
	https: true
};
