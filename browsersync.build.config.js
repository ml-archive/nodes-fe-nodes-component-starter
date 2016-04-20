module.exports = {
	files: ['./dist/**/*.js'],
	server: {
		baseDir: './',
		routes: {
			'/node_modules': 'node_modules'
		}
	},
	https: true
};
