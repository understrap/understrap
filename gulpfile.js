// Defining requirements
var autoprefixer = require( 'autoprefixer' ),
    browserSync = require('browser-sync').create(),
    cleanCSS = require( 'gulp-clean-css' ),
    concat = require( 'gulp-concat' ),
    del = require( 'del' ),
    gulp = require( 'gulp' ),
    imagemin = require( 'gulp-imagemin' ),
    postcss = require( 'gulp-postcss' ),
    rename = require( 'gulp-rename' ),
    replace = require( 'gulp-replace' ),
    sass = require( 'gulp-sass' ),
    sourcemaps = require( 'gulp-sourcemaps' ),
    uglify = require( 'gulp-uglify' ),
    rev = require('gulp-rev'),
    revDel = require('rev-del');


// Configuration file to keep your code DRY
const cfg = require( './gulpconfig.json' );
const paths = cfg.paths;

// Compile SCSS to CSS
function scss( ) {
    return gulp.src( paths.sass + '/*.scss' )
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sass()).on('error', sass.logError)
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(sourcemaps.write(undefined, { sourceRoot: null }))
        .pipe( gulp.dest( paths.css ) );

}

exports.scss = scss;

// Minify CSS
function minifycss( done ) {
    gulp.src( paths.css + '/theme.css' )
        .pipe( sourcemaps.init( { loadMaps: true } ) )
        .pipe( cleanCSS( { compatibility: '*' } ) )
        .pipe( rename( { suffix: '.min' } ) )
        .pipe( sourcemaps.write( './' ) )
        .pipe( gulp.dest( paths.css ) )

        gulp.src( paths.css + '/custom-editor-style.css' )
        .pipe( sourcemaps.init( { loadMaps: true } ) )
        .pipe( cleanCSS( { compatibility: '*' } ) )
        .pipe( rename( { suffix: '.min' } ) )
        .pipe( sourcemaps.write( './' ) )
        .pipe( gulp.dest( paths.css ) );

    done();
};

exports.minifycss = minifycss;

// Concatinate scripts and minify them
function scripts( done ) {
    var scripts = [

        paths.dev + '/js/bootstrap4/bootstrap.js',

        paths.dev + '/js/skip-link-focus-fix.js',
        // Adding currently empty javascript file to add on for your own themes´ customizations
        // Please add any customizations to this .js file only!
        paths.dev + '/js/custom-javascript.js'
    ];

    gulp.src( scripts )
        .pipe( concat( 'theme.js' ) )
        .pipe( gulp.dest( paths.js ) )

    gulp.src( scripts )
        .pipe( concat( 'theme.min.js' ) )
        .pipe( uglify() )
        .pipe( gulp.dest( paths.js ) );

    done();
}

exports.scripts = scripts;

// Compress image assets
function imagemin() {
    return gulp.src( paths.imgsrc + '/**' )
        .pipe( imagemin() )
        .pipe( gulp.dest( paths.img ) );
}

exports.imagemin = imagemin;

// Run:
// gulp copy-assets.
// Copy all needed dependency assets files from bower_component assets to themes /js, /scss and /fonts folder. Run this task after bower install or bower update

////////////////// All Bootstrap SASS  Assets /////////////////////////
gulp.task( 'copy-assets', function(done) {


////////////////// All Bootstrap 4 Assets /////////////////////////
// Copy all JS files
    gulp.src( paths.node + 'bootstrap/dist/js/**/*.js' )
        .pipe( gulp.dest( paths.dev + '/js/bootstrap4' ) );

// Copy all Bootstrap SCSS files
    gulp.src( paths.node + 'bootstrap/scss/**/*.scss' )
        .pipe( gulp.dest( paths.dev + '/sass/bootstrap4' ) );

////////////////// End Bootstrap 4 Assets /////////////////////////

// Copy all Font Awesome Fonts
    gulp.src( paths.node + 'font-awesome/fonts/**/*.{ttf,woff,woff2,eot,svg}' )
        .pipe( gulp.dest( './fonts' ) );

// Copy all Font Awesome SCSS files
    gulp.src( paths.node + 'font-awesome/scss/*.scss' )
        .pipe( gulp.dest( paths.dev + '/sass/fontawesome' ) );

// _s SCSS files
    gulp.src( paths.node + 'undescores-for-npm/sass/media/*.scss' )
        .pipe( gulp.dest( paths.dev + '/sass/underscores' ) );

// _s JS files into /src/js
    gulp.src( paths.node + 'undescores-for-npm/js/skip-link-focus-fix.js' )
.pipe( gulp.dest( paths.dev + '/js' ) );

// Copy Popper JS files
    gulp.src( paths.node + 'popper.js/dist/umd/popper.min.js' )
        .pipe( gulp.dest( paths.js + paths.vendor ) );
    gulp.src( paths.node + 'popper.js/dist/umd/popper.js' )
        .pipe( gulp.dest( paths.js + paths.vendor ) );

    done();
});

// Deleting any file inside the /src folder
gulp.task( 'clean-source', function() {
  return del( ['src/**/*', '!src'] );
});

// Deleting any file inside the /dist folder
gulp.task( 'clean-dist', function() {
  return del( ['dist/**/*', '!dist'] );
});

gulp.task('revision', function(done) {
  // by default, gulp would pick `assets/css` as the base,
  // so we need to set it explicitly:
  gulp.src([paths.css + '/theme.min.css', paths.js + '/theme.min.js'], {base: './'})
    .pipe(rev())
    .pipe(gulp.dest('./'))  // write rev'd assets to build dir
    .pipe(rev.manifest())
    .pipe(gulp.dest('./'));  // write manifest to build dir
done();
});

// Run
// gulp dist
// Copies the files to the /dist folder for distribution as simple theme
gulp.task( 'dist', gulp.series( 'clean-dist', 'revision', function(done) {

  gulp.src( ['**/*', '!' + paths.bower, '!' + paths.bower + '/**', '!' + paths.node, '!' + paths.node + '/**', '!' + paths.dev, '!' + paths.dev + '/**', '!' + paths.dist, '!' + paths.dist + '/**', '!' + paths.distprod, '!' + paths.distprod + '/**', '!' + paths.sass, '!' + paths.sass + '/**', '!readme.txt', '!readme.md', '!package.json', '!package-lock.json', '!gulpfile.js', '!gulpconfig.json', '!CHANGELOG.md', '!.travis.yml', '!jshintignore',  '!codesniffer.ruleset.xml', 'rev-manifest.json', '*'], { 'buffer': false } )
  .pipe( replace( '/js/jquery.slim.min.js', '/js' + paths.vendor + '/jquery.slim.min.js', { 'skipBinary': true } ) )
  .pipe( replace( '/js/popper.min.js', '/js' + paths.vendor + '/popper.min.js', { 'skipBinary': true } ) )
  .pipe( gulp.dest( paths.dist ) );
  done();

}));

// BrowserSync reload helper function
function reload( done ){
    browserSync.reload();
    done();
}

// BrowserSync main task
gulp.task( 'watch-bs', function( done ) {
    browserSync.init( cfg.browserSyncWatchFiles, cfg.browserSyncOptions );
    gulp.watch( paths.sass + '/**/*.scss', gulp.series(scss, minifycss, reload) );
    gulp.watch( [paths.dev + '/js/**/*.js', 'js/**/*.js', '!js/theme.js', '!js/theme.min.js'], gulp.series( scripts, reload ) );

    //Inside the watch task.
    gulp.watch( paths.imgsrc + '/**', gulp.series( imagemin, reload ) );
    done();

});

gulp.task( 'revision', function(done) {
  // by default, gulp would pick `assets/css` as the base,
  // so we need to set it explicitly:
  gulp.src([paths.css + '/theme.min.css', paths.js + '/theme.min.js'], {base: './'})
    .pipe(rev())
    .pipe(gulp.dest('./'))  // write rev'd assets to build dir
    .pipe(rev.manifest())
    .pipe(revDel({dest: './'}))
    .pipe(gulp.dest('./'));  // write manifest to build dir
    done();

});