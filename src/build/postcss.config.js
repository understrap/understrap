'use strict';

const process = require( 'process' );

const colors = [
	'blue',
	'indigo',
	'purple',
	'pink',
	'red',
	'orange',
	'yellow',
	'green',
	'teal',
	'cyan',
	'white',
	'gray',
	'gray-dark',
];

const BS4 = process.argv[ process.argv.length - 1 ] === 'BS4';
const colorInfix = BS4 ? '' : 'bs-';
const output = 'inc/editor-color-palette' + ( BS4 ? '-bootstrap4' : '' ) + '.json';

module.exports = ( ctx ) => {
	let plugins = {
		autoprefixer: {
			cascade: false,
			env: BS4 ? 'bs4' : 'bs5',
		},
	};

	if ( ctx.file.basename.indexOf( 'theme' ) > -1 ) {
		plugins = Object.assign( plugins, {
			'postcss-understrap-palette-generator': {
				colors: colors.map( ( x ) => `--${ colorInfix }${ x }` ),
			},
		} );
	}

	return {
		map: {
			inline: false,
			annotation: true,
			sourcesContent: true,
		},
		plugins: plugins,
	};
};
