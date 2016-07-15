'use strict';

const gulp = require('gulp');
const connect = require('gulp-connect');
const history = require('connect-history-api-fallback');

gulp.task('connect', function() {
    connect.server({
        root: 'public',
        port: 8811,
        livereload: true,
        middleware: (connect, opt) => {
            return [ history({}) ];
        }
    });
});
