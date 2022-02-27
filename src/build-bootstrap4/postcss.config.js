'use strict';

module.exports = ( ctx ) => {
	return {
		map: {
			inline: false,
			annotation: true,
			sourcesContent: true,
		},
		plugins: {
			autoprefixer: {
				cascade: false,
				env: 'bs4',
			},
			'postcss-understrap-palette-generator': {
				colors: [
					'--blue',
					'--indigo',
					'--purple',
					'--pink',
					'--red',
					'--orange',
					'--yellow',
					'--green',
					'--teal',
					'--cyan',
					'--white',
					'--gray',
					'--gray-dark',
				],
			},
		},
	};
};
