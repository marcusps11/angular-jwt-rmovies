var gulp = require('gulp');

require('./tasks/styles');
require('./tasks/scripts');
require('./tasks/liveConnect');

gulp.task('build', [
    'app'
]);

gulp.task('live-reload', [
    'connect'
]);

gulp.task('default', [
    'watch-sass',
    'build',
    'live-reload'
]);
