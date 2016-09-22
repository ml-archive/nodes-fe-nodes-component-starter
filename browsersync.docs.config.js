module.exports = {
	files: ['./docs/*.*', './dist/**/*.*'],
	server: {
		baseDir: './docs',
		routes: {
			'/node_modules': 'node_modules',
			'/dist': 'dist'
		}
	},
	https: true
};
