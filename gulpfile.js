/**
 * Created by Dmytro on 3/27/2016.
 */
var browserify = require('browserify'),
    gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    argv = require('yargs').argv;

gulp.task('build', function () {
    if(argv.watch)
        gulp.watch('./src/**/*.js', ['build']);

    return browserify('./src/eventDriver.js', {debug: true, extensions: ['es6']})
        .transform("babelify", {presets: ["es2015"]})
        .bundle()
        .pipe(source('eventDriver.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(gulp.dest('./dist/'))
        .pipe(sourcemaps.write())
});

gulp.task('default', ['build']);