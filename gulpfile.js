'use strict';

var gulp 			= require('gulp');
var postcss    		= require('gulp-postcss');
var sass 			= require('gulp-sass');
var autoprefixer 	= require('autoprefixer');
var cssnano 		= require('cssnano');

var templateCache 	= require('gulp-angular-templatecache');
var ngAnnotate      = require('gulp-ng-annotate');

var babel 			= require('gulp-babel');
var Builder 		= require('systemjs-builder');

var runSequence 	= require('run-sequence');
var clean 			= require('gulp-clean');
var sourcemaps 		= require('gulp-sourcemaps');

var config = {
	templates: {
		src: './src/**/*.html',
		dist: './tmp',
		options: {
			root: 'src',
			templateHeader: 'export default angular.module("<%= module %>"<%= standalone %>).run(["$templateCache", function($templateCache) {'
		}
	},
	js: {
		src: './src/**/*.js',
		dist: './tmp'
	},
	sass: {
		src: './src/**/*.scss',
		dist: './dist'
	},
	autoprefixer: {
		browsers: ['last 2 versions']
	},
	cssnano: {
		safe: true
	},
	babel: {
		presets: ['es2015']
	},
	systemJs: {
		entry: './tmp/*.js',
		dev: {
			dist: './dist/component.js',
			options: {
				sourceMaps: 'inline',
				runtime: false,
				minify: false
			}
		},
		production: {
			dist: './dist/component.min.js',
			options: {
				sourceMaps: 'inline',
				runtime: false,
				minify: true
			}
		}
	}
};

/**
 * STYLES
 */
gulp.task('styles', function() {
	var processors = [
		autoprefixer(config.autoprefixer),
		cssnano(config.cssnano)
	];

	return gulp.src(config.sass.src)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss(processors))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.sass.dist));
});

/**
 * Angular
 */
gulp.task('ng-annotate', function() {
	return gulp.src(config.js.dist + '/**/*.js')
		.pipe(ngAnnotate())
		.pipe(gulp.dest(config.js.dist));
});

gulp.task('angular-templates', function() {
	return gulp.src(config.templates.src)
		.pipe(templateCache(config.templates.options))
		.pipe(gulp.dest(config.templates.dist));
});

/**
 * Javascript
 */
gulp.task('babel', function() {
	return gulp.src(config.js.src)
		.pipe(babel(config.babel))
		.pipe(gulp.dest(config.js.dist));
});

gulp.task('systemJS:dev', function(callback) {
	var builder = new Builder('./');
	builder.buildStatic(config.systemJs.entry, config.systemJs.dev.dist, config.systemJs.dev.options).then(function() {
		callback();
	}).catch(function(error) {
		console.log(error);
	});
});

gulp.task('systemJS:dist', function(callback) {
	var builder = new Builder('./');

	builder.buildStatic(config.systemJs.entry, config.systemJs.production.dist, config.systemJs.production.options)
		.then(function() {
			callback();
		})
		.catch(function(error) {
			console.log(error);
		});
});

/**
 * MISC
 */
gulp.task('clean', function() {
	return gulp.src(config.js.dist, {read: false})
		.pipe(clean());
});

gulp.task('watch', function() {
	gulp.watch(config.js.src, ['build:js']);
	gulp.watch(config.sass.src, ['build:styles']);
});

gulp.task('build:js', function() {
	runSequence('clean', 'babel', 'ng-annotate', 'angular-templates', ['systemJS:dev', 'systemJS:dist'], 'clean');
});

gulp.task('build:styles', function() {
	runSequence('styles');
});

gulp.task('build', function() {
	runSequence('clean', 'babel', 'styles', 'ng-annotate', 'angular-templates', ['systemJS:dev', 'systemJS:dist'], 'clean');
});
