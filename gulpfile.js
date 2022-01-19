'use strict';

var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var del = require('del');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
// Set the browser that you want to support

// Gulp task to minify CSS files
gulp.task('styles', function () {
    return gulp.src('./style.css')
      // Auto-prefix css styles for cross browser compatibility
      .pipe(autoprefixer())
      // Minify the file
      .pipe(csso())
      // Output
      .pipe(gulp.dest('./dist/'))
  });

// Gulp task to minify JavaScript files
gulp.task('scripts', function() {
    return gulp.src('./*.js','!./gulpfile.js')
      // Minify the file
      .pipe(uglify())
      // Output
      .pipe(gulp.dest('./dist/'))
  });

// Gulp task to minify HTML files
gulp.task('pages', function() {
    return gulp.src(['./*.html'])
      .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true
      }))
      .pipe(gulp.dest('./dist'));
  });

// Clean output directory
gulp.task('clean', (done) => {del.sync(['dist']);done();});
// Gulp task to minify all files
gulp.task('default', gulp.series('clean','styles','scripts','pages'));