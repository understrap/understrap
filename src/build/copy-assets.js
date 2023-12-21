const utils = require( './utils' );

// Copy all Bootstrap SCSS files.
utils.copyDir( './node_modules/bootstrap4/scss', './src/sass/assets/bootstrap4' );
utils.copyDir( './node_modules/bootstrap/scss', './src/sass/assets/bootstrap5' );
// Copy all Font Awesome SCSS files.
utils.copyDir( './node_modules/font-awesome/scss', './src/sass/assets/fontawesome' );
