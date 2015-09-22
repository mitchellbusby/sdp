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
	gulp.watch('./css/_scss/*.scss', ['sass']);
});

gulp.task('webserver', function() {
	gulp.src('')
		.pipe(webserver({
			//directoryListing: true,
			open: true
		}));
});

gulp.task('run', ['sass:watch', 'webserver'], function() {

});