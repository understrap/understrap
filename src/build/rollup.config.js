'use strict';

/**
 * External dependencies
 */
const path = require( 'path' );
const { babel } = require( '@rollup/plugin-babel' );
const { nodeResolve } = require( '@rollup/plugin-node-resolve' );
const commonjs = require( '@rollup/plugin-commonjs' );
const multi = require( '@rollup/plugin-multi-entry' );
const replace = require( '@rollup/plugin-replace' );
const terser = require( '@rollup/plugin-terser' );
const terserOptions = require( './terser.config' );

/**
 * Internal dependencies
 */
const banner = require( './banner.js' );

// Determine if we want to build for Bootstrap v4 or v5.
const BS4 = process.argv[ process.argv.length - 1 ] === 'BS4';

// Variables common for Bootstrap 4 and 5.
const globals = { jquery: 'jQuery' }; // Ensure we use jQuery which is always available even in noConflict mode
const external = [ 'jquery' ];
// Bootstrap 5 does not need jQuery. This is for custom JS relying on jQuery.

// Populate Bootstrap version specific variables.
let bsVersion = 5;
let bsSrcFile = 'bootstrap.js';
let fileDest = 'theme';
if ( BS4 ) {
	// Adjustments for Bootstrap version 4.
	bsVersion = 4;
	bsSrcFile = 'bootstrap4.js';
	fileDest = 'theme-bootstrap4';
}

const plugins = [
	babel( {
		browserslistEnv: `bs${ bsVersion }`,
		// Include the helpers in the bundle, at most one copy of each.
		babelHelpers: 'bundled',
	} ),
	replace( {
		'process.env.NODE_ENV': '"production"',
		preventAssignment: true,
	} ),
	nodeResolve(),
	commonjs(),
	multi(),
];

module.exports = {
	input: [
		path.resolve( __dirname, `../js/${ bsSrcFile }` ),
		path.resolve( __dirname, '../js/skip-link-focus-fix.js' ),
		path.resolve( __dirname, '../js/custom-javascript.js' ),
	],
	output: [
		{
			banner: banner( '' ),
			file: path.resolve( __dirname, `../../js/${ fileDest }.js` ),
			format: 'umd',
			globals,
			name: 'understrap',
		},
		{
			banner: banner( '' ),
			file: path.resolve( __dirname, `../../js/${ fileDest }.min.js` ),
			format: 'umd',
			globals,
			name: 'understrap',
			plugins: [ terser( terserOptions ) ],
		},
	],
	external,
	plugins,
};
