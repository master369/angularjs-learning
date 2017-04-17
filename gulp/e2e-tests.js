/* global __dirname */
(function () {
	'use strict';

	var gulp = require('gulp');

	var $ = require('gulp-load-plugins')();

	var browserSync = require('browser-sync');

	var protractorConf = require(__dirname + '\\..\\protractor.conf.js');

	// Downloads the selenium webdriver
	gulp.task('webdriver-update', $.protractor.webdriver_update);

	gulp.task('webdriver-standalone', $.protractor.webdriver_standalone);

	function runProtractor(done) {
		gulp.src(protractorConf.config.specs)
			.pipe($.protractor.protractor({
				configFile: 'protractor.conf.js'
			}))
			.on('error', function (err) {
				// Make sure failed tests cause gulp to exit non-zero
				throw err;
			})
			.on('end', function () {
				// Close browser sync server
				browserSync.exit();
				done();
			});
	}

	gulp.task('protractor', ['protractor:src']);
	gulp.task('protractor:src', ['serve:e2e', 'webdriver-update'], runProtractor);
	gulp.task('protractor:dist', ['serve:e2e-dist', 'webdriver-update'], runProtractor);
}());
