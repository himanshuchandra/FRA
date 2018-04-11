var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
 
gulp.task('compress', function() {
  return gulp.src(['src/module.js', 'src/directive/*.js'])
    .pipe(concat('ng-google-maps.min.js'))
    .pipe(uglify())
    .pipe(rename({
        basename: 'ng-google-maps',
        suffix: '.min',
        extname: '.js'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('concatinate', function() {
  return gulp.src(['src/module.js', 'src/directive/*.js'])
    .pipe(concat('ng-google-maps.js'))
    .pipe(rename({
        basename: 'ng-google-maps',
        extname: '.js'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['compress', 'concatinate']);