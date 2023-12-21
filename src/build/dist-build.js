const utils = require( './utils' );
const pkg = require( '../../package.json' );
const ignore = [
	'dist',
	'node_modules',
	'src',
	'vendor',
	'composer.json',
	'composer.lock',
	'package.json',
	'package-lock.json',
	'phpcs.xml.dist',
	'phpmd.baseline.xml',
	'phpmd.xml',
	'phpstan-baseline.neon',
	'phpstan.neon.dist',
];

utils.copyDir( './', `./dist/${ pkg.name }-${ pkg.version }`, ignore );
