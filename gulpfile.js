// Defining requirements
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');
var runSequence = require('run-sequence');
var del = require('del');


// Custom Settings used within this gulpfile
var gulpFileSettings = {
    basePaths: {
        node: './node_modules/',
        dev: './static/'
    },
    browserSync: {
        watch: [
            './static/dist/css/*.min.css',
            './static/dist/js/*.min.js',
            './**/*.php'
        ],
        options: {
            proxy: 'latife.dev',
            notify: false
        }
    }
}


// Run:
// gulp clear-vendor
// Removes all vendor files
gulp.task('clear-vendor', function () {
    return del([
        gulpFileSettings.basePaths.dev + 'sass/vendor/**/*',
        gulpFileSettings.basePaths.dev + 'css/vendor/**/*',
        gulpFileSettings.basePaths.dev + 'js/vendor/**/*',
    ]);
});


// Run:
// gulp clear-dist
// Removes all distribution files
gulp.task('clear-dist', function () {
    return del([
        gulpFileSettings.basePaths.dev + 'dist/js/*',
        gulpFileSettings.basePaths.dev + 'dist/css/*',
        gulpFileSettings.basePaths.dev + 'dist/fonts/*',
    ]);
});


// Run:
// gulp copy-js.
// Copy all needed dependency js files
gulp.task('copy-js', function () {
    var scripts = [
        gulpFileSettings.basePaths.node + 'bootstrap/dist/js/bootstrap.js',
        gulpFileSettings.basePaths.node + 'owl.carousel/dist/owl.carousel.js',
        gulpFileSettings.basePaths.node + 'jquery/dist/jquery.js',
        gulpFileSettings.basePaths.node + 'underscores-for-npm/js/*.js',
        gulpFileSettings.basePaths.node + 'fitvids/dist/fitvids.js',
        gulpFileSettings.basePaths.node + 'lightgallery/dist/js/lightgallery.js',
    ];

    return gulp.src(scripts, {base: gulpFileSettings.basePaths.node})
        .pipe(gulp.dest(gulpFileSettings.basePaths.dev + 'js/vendor/'));
});


// Run:
// gulp copy-sass
// Copy all needed dependency sass files
gulp.task('copy-sass', function () {
    var sass = [
        gulpFileSettings.basePaths.node + 'bootstrap/scss/**/*.scss',
        gulpFileSettings.basePaths.node + 'font-awesome/scss/*.scss',
        gulpFileSettings.basePaths.node + 'owl.carousel/src/scss/*.scss',
        gulpFileSettings.basePaths.node + 'underscores-for-npm/sass/**/*.scss',
        gulpFileSettings.basePaths.node + 'lightgallery/src/sass/*.scss',
    ];

    return gulp.src(sass, {base: gulpFileSettings.basePaths.node})
        .pipe(gulp.dest(gulpFileSettings.basePaths.dev + 'sass/vendor/'));
});


// Run:
// gulp copy-fonts
// Copy all needed dependency font files
gulp.task('copy-fonts', function () {
    var fonts = [
        gulpFileSettings.basePaths.node + 'font-awesome/fonts/**/*.{ttf,woff,woff2,eot,svg}',
        gulpFileSettings.basePaths.node + 'lightgallery/src/fonts/*.{ttf,woff,woff2,eot,svg}'
    ]

    return gulp.src(fonts)
        .pipe(gulp.dest(gulpFileSettings.basePaths.dev + 'dist/fonts'));
});


// Run:
// gulp copy-assets.
// Clear the static file folder and then run all tasks that copy dependency assets
gulp.task('copy-assets', function(callback) {
    runSequence(
        'clear-vendor',
        ['copy-js', 'copy-sass', 'copy-fonts'],
        callback
    );
});


// Run:
// gulp sass
// Compiles SCSS/SASS files into CSS
gulp.task('sass', function () {
    return gulp.src([
        gulpFileSettings.basePaths.dev + 'sass/vendor/**/*.{scss, sass}',
        '!' + gulpFileSettings.basePaths.dev + 'sass/vendor/lightgallery/**/lg-*.scss',
        //Comment out bootstrap.scss here as we are pulling it into our theme.scss
        '!' + gulpFileSettings.basePaths.dev + 'sass/vendor/bootstrap/scss/bootstrap.scss',
        '!' + gulpFileSettings.basePaths.dev + 'sass/vendor/bootstrap/scss/bootstrap-grid.scss',
        '!' + gulpFileSettings.basePaths.dev + 'sass/vendor/bootstrap/scss/bootstrap-reboot.scss',
        gulpFileSettings.basePaths.dev + 'sass/theme.scss',
    ], {base: gulpFileSettings.basePaths.dev + 'sass/'})
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest(gulpFileSettings.basePaths.dev + 'css'))
        .pipe(concat('theme.css'))
        .pipe(gulp.dest(gulpFileSettings.basePaths.dev + 'css'))
        .pipe(rename({basename: 'custom-editor-style'}))
        .pipe(gulp.dest(gulpFileSettings.basePaths.dev + 'css'));
});


// Run:
// gulp minify-styles
// Minifies the resulting CSS file
gulp.task('minify-styles', function() {
    return gulp.src(gulpFileSettings.basePaths.dev + 'css/theme.css')
        .pipe(plumber())
        .pipe(gulp.dest(gulpFileSettings.basePaths.dev + 'css'))
        .pipe(sourcemaps.init())
        .pipe(cleanCSS({keepSpecialComments: 0}))
        .pipe(rename({basename: 'theme', suffix: '.min'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(gulpFileSettings.basePaths.dev + 'dist/css'));
});


// Run:
// gulp build-styles
// Runs sass; Concatenates and minifies CSS files
gulp.task('build-styles',function(callback) {
    runSequence('sass', 'minify-styles', callback);
});


// Run:
// gulp clear-js
// Removes all top level JS files in the static/js directory
gulp.task('clear-js', function () {
    return del(gulpFileSettings.basePaths.dev + 'js/*.js');
});


// Run:
// gulp build-scripts
// Uglifies and concat all JS files into one
gulp.task('minify-scripts', function() {
    var scripts = [
        gulpFileSettings.basePaths.dev + 'js/vendor/jquery/dist/*.js', // Must be loaded before BS4
        gulpFileSettings.basePaths.dev + 'js/vendor/owl.carousel/dist/*.js', // Must be loaded before BS4
        gulpFileSettings.basePaths.dev + 'js/vendor/bootstrap/dist/*.js', // All BS4 stuff
        gulpFileSettings.basePaths.dev + 'js/vendor/underscores-for-npm/js/*.js', // Underscores JS
        gulpFileSettings.basePaths.dev + 'js/vendor/fitvids/dist/*.js', // FitVids JS
        gulpFileSettings.basePaths.dev + 'js/vendor/lightgallery/dist/js/*.js', // FitVids JS
        '!' + gulpFileSettings.basePaths.dev + 'js/vendor/underscores-for-npm/js/customizer.js', // Underscores JS
        gulpFileSettings.basePaths.dev + 'js/theme/**/*.js', // Custom theme JS
    ];

    return gulp.src(scripts)
        .pipe(concat('theme.js'))
        .pipe(gulp.dest(gulpFileSettings.basePaths.dev + 'js/'))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(gulpFileSettings.basePaths.dev + 'dist/js/'));
});


// Run:
// gulp build-scripts
// Runs sass; Concatenates and minifies CSS files
gulp.task('build-scripts',function(callback) {
    runSequence('clear-js', 'minify-scripts', callback);
});


// Run:
// gulp browser-sync
// Starts browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    browserSync.init(gulpFileSettings.browserSync.watch, gulpFileSettings.browserSync.options);
});


// Run:
// gulp watch
// Starts watcher. Watcher runs gulp tasks for scripts and styles on changes
gulp.task('watch', function () {
    gulp.watch(gulpFileSettings.basePaths.dev + 'sass/theme/**/*.scss', ['build-styles']);
    gulp.watch(gulpFileSettings.basePaths.dev + 'sass/theme.scss', ['build-styles']);
    gulp.watch(gulpFileSettings.basePaths.dev + 'js/**/*.js', ['build-scripts']);
});


// Run:
// gulp watch-bs
// Starts watcher with browser-sync. Browser-sync reloads page automatically on your browser
gulp.task('watch-bs', ['browser-sync', 'watch']);


// Run:
// gulp
// Default task to run through everything
gulp.task('default', function (callback) {
    runSequence('clear-dist', 'copy-assets', 'build-styles', 'build-scripts', 'watch', callback);
});