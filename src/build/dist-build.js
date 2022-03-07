const { promises: fs } = require( 'fs' );
const path = require( 'path' );
const pkg = require( '../../package.json' );

async function copyDir( src, dest ) {
	await fs.mkdir( dest, { recursive: true } );
	const entries = await fs.readdir( src, { withFileTypes: true } );
	const ignore = [
		'node_modules',
		'dist',
		'src',
		'vendor',
		'.github',
		'.browserslistrc',
		'.editorconfig',
		'.gitattributes',
		'.gitignore',
		'composer.json',
		'composer.lock',
		'package.json',
		'package-lock.json',
		'phpcs.xml.dist',
		'.git',
	];

	for ( let entry of entries ) {
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
