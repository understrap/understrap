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

/**
 * Internal dependencies
 */
const banner = require( './banner.js' );
const babelConfig = require( './babel.config' );

const bootstrap6 = process.env.BOOTSTRAP6 === 'true';
const bootstrapEntry = bootstrap6 ? 'bootstrap6.js' : 'bootstrap.js';
const filename = bootstrap6 ? 'theme-bootstrap6' : 'theme';

const external = [ 'jquery' ];

const plugins = [
	babel( {
		presets: babelConfig.presets,
		browserslistEnv: bootstrap6 ? 'bs6' : 'bs5',
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
		path.resolve( __dirname, `../js/${ bootstrapEntry }` ),
		path.resolve( __dirname, '../js/skip-link-focus-fix.js' ),
		path.resolve( __dirname, '../js/custom-javascript.js' ),
	],
	output: {
		banner: banner( '' ),
		file: path.resolve( __dirname, `../../js/${ filename }.js` ),
		...( bootstrap6 ? { format: 'es' } : {
			format: 'umd',
			globals: { jquery: 'jQuery' },
			name: 'understrap',
		} ),
	},
	external,
	plugins,
};
