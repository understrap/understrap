const { promises: fs } = require( 'fs' );
const path = require( 'path' );

module.exports.copyDir = async function copyDir( src, dest, ignore ) {
	await fs.mkdir( dest, { recursive: true } );
	let entries = await fs.readdir( src, { withFileTypes: true } );
	// Exclude all dot files and directories.
	entries = entries.filter( dirent => ! dirent.name.startsWith('.') );
	ignore = ignore || [];

	for ( const entry of entries ) {
		if ( ignore.indexOf( entry.name ) != -1 ) {
			continue;
		}
		const srcPath = path.join( src, entry.name );
		const destPath = path.join( dest, entry.name );

		entry.isDirectory()
			? await copyDir( srcPath, destPath )
			: await fs.copyFile( srcPath, destPath );
	}
}
