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
		dist: './dist'
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
		entry: 'index.js',
		dev: {
			dist: './dist/component.js',
			options: {
				runtime: false,
				minify: false
			}
		},
		production: {
			dist: './dist/component.min.js',
			options: {
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
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.sass.dist));
});

gulp.task('styles:watch', function() {
	gulp.watch(config.sass.src, ['styles']);
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
		.pipe(templateCache())
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
	var entry = config.js.dist + '/' + config.systemJs.entry;

	builder.buildStatic(entry, config.systemJs.dev.dist, config.systemJs.dev.options).then(function() {
		callback();
	}).catch(function(error) {
		console.log(error);
	});
});

gulp.task('systemJS:dist', function(callback) {
	var builder = new Builder('./');
	var entry = config.js.dist + '/' + config.systemJs.entry;

	builder.buildStatic(entry, config.systemJs.production.dist, config.systemJs.production.options)
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

gulp.task('build', function() {
	runSequence('clean', 'babel', 'styles', 'ng-annotate', ['systemJS:dev', 'systemJS:dist', 'angular-templates'], 'clean');
});
