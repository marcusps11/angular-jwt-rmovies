'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    plumber = require('gulp-plumber');

gulp.task('build-js', function() {
    gulp.src('./public/scripts/src/**/*.js')
        .pipe(plumber())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./public/scripts/build'))
        .pipe(connect.reload());
});

gulp.task('app', function() {
    watch('./public/scripts/src/**/*.js', function() {
        gulp.start('build-js');
    });
});
