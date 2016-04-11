module.exports = function(browserSync) {
	return {
		files: ['./dist/**/*.js'],
		server: {
			baseDir: './',
			routes: {
				'/node_modules': 'node_modules'
			}
		},
		https: true
	}
};