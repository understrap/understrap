'use strict';

const pkg = require( '../../package.json' );
const year = new Date().getFullYear();

function getBanner( pluginFilename ) {
	return `/*!
 * Understrap${ pluginFilename ? ` ${ pluginFilename }` : '' } v${ pkg.version } (${ pkg.homepage })
 * Copyright 2013-${ year } ${ pkg.author }
 * Licensed under ${ pkg.license } (${ pkg.licenseUrl })
 */`;
}

module.exports = getBanner;
