'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    connect = require('gulp-connect'),
    sources = [
        './public/styles/scss/**/*.scss',
        './public/scripts/src/states/**/*.scss',
        './public/scripts/src/directives/**/*.scss'
    ];

gulp.task('styles', function() {
    gulp
        .src(sources)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/styles/build/'))
        .pipe(connect.reload());
});

gulp.task('watch-sass', function () {
    watch(sources, function() {
        gulp.start('styles');
    });
});
