'use strict';
var gulp = require('gulp');
//Dependency to compile JS files
//var concat = require('gulp-concat');
//Dependency to compile SASS files
var sass = require('gulp-sass');
//Dependency to run webserver
var webserver = require('gulp-webserver');
//Dependency to concat js files
var concat = require('gulp-concat');
//Dependency to create a nice source map (allows the user to easily debug a minified file)
var sourcemaps = require('gulp-sourcemaps');
// Dependency for minify
var uglify = require('gulp-uglify');
//Error logging
var gutil = require('gulp-util');


gulp.task('default', ['sass'], function(){

});
gulp.task('build', ['sass', 'concat-js'], function(){

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

gulp.task('styleguide', ['sass'], function() {
});
gulp.task('webserver-public', function() {
	gulp.src('')
		.pipe(webserver({
			host: '0.0.0.0',
			liveReload: true,
			port: '8080'
		}));
});

gulp.task('run', ['sass', 'concat-js', 'sass:watch', 'concat:watch', 'webserver'], function() {

});

gulp.task('external-server', ['sass:watch', 'concat:watch', 'webserver-public'], function() {
});

gulp.task('concat-js', function() {
	return gulp.src(jsFiles, {base: './'})
		.pipe(sourcemaps.init())
			.pipe(uglify().on('error', gutil.log))
				.pipe((concat('main.js')))
					.pipe(sourcemaps.write())
						.pipe(gulp.dest('.'));
});

gulp.task('concat:watch', function() {
	gulp.watch(jsFiles, ['concat-js']);
});
var jsFiles = ['./app.js',
	 './services/messagingService.js',
	 './services/registerService.js',
	 './services/helpsRestfulServices.js',
	 './services/helpsModelServices.js',
	 './factories/authenticationFactories.js',
	 './factories/helpsRestfulFactories.js',
	 './controllers/ExampleController/ExampleController.js',
	 './controllers/LoginController/LoginController.js',
	 './controllers/UpcomingActivitiesController/UpcomingActivitiesController.js',
	 './controllers/RegisterController/RegisterController.js',
	 './controllers/DashboardController/DashboardController.js',
	 './services/messagingService.js',
	 './constants.js',
	 './directives/directives.js',
	 './controllers/UpcomingBookingsController/UpcomingBookingsController.js',
	 './controllers/PastBookingsController/PastBookingsController.js',
	 './controllers/HelpController/HelpController.js',
	 './controllers/SessionsController/SessionsController.js',
];
