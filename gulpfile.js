'use strict';

var gulp 			= require('gulp');
var postcss    		= require('gulp-postcss');
var sass 			= require('gulp-sass');
var autoprefixer 	= require('autoprefixer');
var cssnano 		= require('cssnano');

var templateCache 	= require('gulp-angular-templatecache');

var Builder 		= require('systemjs-builder');

var runSequence 	= require('run-sequence');
var clean 			= require('gulp-clean');
var sourcemaps 		= require('gulp-sourcemaps');
var inject 			= require('gulp-inject-string');

var tslint 			= require('gulp-tslint');

var config = {
	templates: {
		src: './src/**/*.html',
		dist: './tmp',
		options: {
			filename: 'templates.ts',
			root: 'src',
			standalone: true,
			templateHeader: 'export default angular.module("<%= module %>"<%= standalone %>).run(["$templateCache", function($templateCache) {'
		}
	},
	ts: {
		src: './src/**/*.ts'
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
		entry: './src/main.ts',
		dev: {
			dist: './dist/component.js',
			options: {
				sourceMaps: true,
				debug: true,
				runtime: false,
				minify: false
			}
		},
		production: {
			dist: './dist/component.min.js',
			options: {
				sourceMaps: true,
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
gulp.task('angular-templates', function() {
	return gulp.src(config.templates.src)
		.pipe(templateCache(config.templates.options))
		.pipe(gulp.dest(config.templates.dist));
});

/**
 * Javascript
 */
gulp.task('systemJS:dev', function(callback) {

	var builder = new Builder('./', './jspm.config.js');

	builder.buildStatic(config.systemJs.entry, config.systemJs.dev.dist, config.systemJs.dev.options).then(function() {
		callback();
	}).catch(function(error) {
		console.log(error);
	});
});

gulp.task('systemJS:dist', function(callback) {
	var builder = new Builder('./', './jspm.config.js');

	builder.buildStatic(config.systemJs.entry, config.systemJs.production.dist, config.systemJs.production.options).then(function() {
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

gulp.task('inject-templates-module', function(){
	gulp.src(config.systemJs.entry)
		.pipe(inject.prepend("import '../tmp/templates'; \n"))
		.pipe(gulp.dest('./src'));
});

gulp.task('remove-injection-templates-module', function(){
	gulp.src(config.systemJs.entry)
		.pipe(inject.replace("import '../tmp/templates'; \n", ""))
		.pipe(gulp.dest('./src'));
});

gulp.task('watch', function() {
	gulp.watch(config.ts.src, ['build:ts']);
	gulp.watch(config.sass.src, ['build:styles']);
	gulp.watch(config.templates.src, ['build:templates']);
});

gulp.task('build:ts', function() {
	runSequence('clean', 'angular-templates', 'inject-templates-module', ['systemJS:dev', 'systemJS:dist'], 'remove-injection-templates-module', 'clean');
});

gulp.task('build:templates', function() {
	runSequence('clean', 'angular-templates', 'inject-templates-module', ['systemJS:dev', 'systemJS:dist'], 'remove-injection-templates-module', 'clean');
});

gulp.task('build:styles', function() {
	runSequence('styles');
});

gulp.task('build', function() {
	runSequence('clean', 'styles', 'angular-templates', 'inject-templates-module', ['systemJS:dev', 'systemJS:dist'], 'remove-injection-templates-module', 'clean');
});
