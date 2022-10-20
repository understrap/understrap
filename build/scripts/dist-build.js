const { promises: fs } = require( 'fs' );
const path = require( 'path' );
const pkg = require( '../../package.json' );

async function copyDir( src, dest ) {
	await fs.mkdir( dest, { recursive: true } );
	let entries = await fs.readdir( src, { withFileTypes: true } );
	// Exclude all dot files and directories.
	entries = entries.filter( dirent => ! dirent.name.startsWith('.') );
	const ignore = [
		'build',
		'dist',
		'node_modules',
		'src',
		'tests',
		'vendor',
		'composer.json',
		'composer.lock',
		'package.json',
		'package-lock.json',
	];

	for ( const entry of entries ) {
		if ( ignore.indexOf( entry.name ) != -1 ) {
			continue;
		}
		let srcPath = path.join( src, entry.name );
		let destPath = path.join( dest, entry.name );

		entry.isDirectory()
			? await copyDir( srcPath, destPath )
			: await fs.copyFile( srcPath, destPath );
	}
}

copyDir( './', `./dist/${ pkg.name }-${ pkg.version }` );
