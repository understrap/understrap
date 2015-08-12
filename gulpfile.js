var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var merge2 = require('merge2');
var ignore = require('gulp-ignore');
var rimraf = require('gulp-rimraf');


gulp.task('sass', function () {
    gulp.src('./sass/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./css/theme.css', ['minifycss']);
});

gulp.task('minifycss', ['cleancss'], function(){
  return gulp.src('./src/css/*.css')
    .pipe(plumber())
    .pipe(rename({suffix: '.min'}))
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest('./src/css/'));
}); 

gulp.task('cleancss', function() {
  return gulp.src('./css/*.min.css', { read: false }) // much faster 
    .pipe(ignore('theme.css'))
    .pipe(rimraf());
});

gulp.task('copy-assets', function() {
    gulp.src('./bower_components/bootstrap-sass/assets/javascripts/*.js')
       .pipe(gulp.dest('./js'));
    gulp.src('./bower_components/bootstrap-sass/assets/stylesheets/*.scss')
       .pipe(gulp.dest('./sass/bootstrap'));
    gulp.src('./bower_components/bootstrap-sass/assets/fonts/bootstrap/*.{ttf,woff,eof,svg}')
        .pipe(gulp.dest('./fonts'));
    gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}')
        .pipe(gulp.dest('./fonts'));
    gulp.src('./bower_components/jquery/dist/*.js')
        .pipe(gulp.dest('./js'));
    gulp.src('./bower_components/_s/js/*.js')
        .pipe(gulp.dest('./js'));
    gulp.src('./bower_components/_s/sass/**/*.scss')
        .pipe(gulp.dest('./sass/underscores'));
});
