/* eslint-disable no-console, eslint-comments/disable-enable-pair */

'use strict';

/**
 * External dependencies
 */
const { rm } = require( 'fs' );

// Directory path.
const dir = './dist';

// Delete directory recursively.
rm( dir, { recursive: true }, ( error ) => {
	if ( error ) {
		console.error( error.name + ': ' + error.message + '\n' );
	} else {
		console.log( dir + ' is deleted!\n' );
	}
} );
