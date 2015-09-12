'use strict';
var gulp = require('gulp');
//Dependency to compile JS files
//var concat = require('gulp-concat');
//Dependency to compile SASS files
var sass = require('gulp-sass');
//Dependency to run webserver
var webserver = require('gulp-webserver');

gulp.task('default', ['sass'], function(){

});
gulp.task('build', ['sass'], function(){

});

gulp.task('sass', function() {
	gulp.src('./css/_scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function() {
	gulp.watch(['css/_scss/*.scss', 'css/_scss/components/*.scss'], ['sass']);
});

gulp.task('webserver', function() {
	gulp.src('')
		.pipe(webserver({
			liveReload: true,
			//directoryListing: true,
			open: true
		}));
});

gulp.task('webserver-public', function() {
	gulp.src('')
		.pipe(webserver({
			host: '0.0.0.0',
			port: '8080'
		}))
});

gulp.task('run', ['sass:watch', 'webserver'], function() {

});

gulp.task('external-server', ['sass:watch', 'webserver-public'], function() {
});