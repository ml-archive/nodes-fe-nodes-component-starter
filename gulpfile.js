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

var path			= require('path');
var fs 				= require('fs');

var config = {
	templates: {
		enabled: true,
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
		entry: './tmp/main.ts',
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
	if(!config.templates.enabled || !config.templates.exists) return;

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
	}).catch(function(error) {
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

gulp.task('check-for-templates', function(done) {
	if(!config.templates.hasOwnProperty('exists') && config.templates.enabled) {
		_fileTypeExists('./src', /\.html$/, function(exists) {
			config.templates.exists = exists;
			done();
		});
	} else {
		done();
	}
});

gulp.task('inject-templates-module', function(){
	if(!config.templates.enabled || !config.templates.exists) return;

	return gulp.src(config.systemJs.entry)
		.pipe(inject.prepend("import './templates'; \n"))
		.pipe(gulp.dest('./tmp'));

});

gulp.task('remove-injection-templates-module', function(){
	if(!config.templates.enabled || !config.templates.exists) return;

	return gulp.src(config.systemJs.entry)
		.pipe(inject.replace("import './templates'; \n", ""))
		.pipe(gulp.dest('./tmp'));
});

gulp.task('watch', function() {
	gulp.watch(config.sass.src, ['build:styles']);
	gulp.watch([
		config.ts.src,
		config.templates.src
	], ['bundle']);
});

gulp.task('copy-to-tmp', function() {
	return gulp.src('./src/**/*')
		.pipe(gulp.dest('./tmp'));
});

gulp.task('build:styles', function() {
	runSequence('clean', 'styles', 'clean');
});

gulp.task('bundle', function() {
	runSequence('clean', 'check-for-templates', 'copy-to-tmp', 'angular-templates', 'inject-templates-module', ['systemJS:dev', 'systemJS:dist'], 'remove-injection-templates-module', 'clean');
});

gulp.task('build', function() {
	runSequence(['bundle', 'styles']);
});

/**
 * Checks if certain file-type exists in path recursively
 * @param startPath
 * @param filter
 * @param callback
 */
function _fileTypeExists(startPath, filter, callback) {

	var result 	= false;

	function lookupFiles(dir) {

		if ( !fs.existsSync(dir) ) {
			console.log('Path does not exists', startPath);
			return;
		}

		var files = fs.readdirSync(dir);

		files.forEach(function(filename) {

			var src 		= path.join(dir, filename);
			var stat 		= fs.lstatSync(src);

			if ( stat.isDirectory() ){
				lookupFiles(src, filter);
			}
			else if ( filter.test(filename) ) {
				result = true;
			}
		});

	}

	lookupFiles(startPath);
	callback(result);
}