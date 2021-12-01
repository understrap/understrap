'use strict'

module.exports = ctx => {
  return {
    map: {
        inline: false,
        annotation: true,
        sourcesContent: true
    },
    plugins: {
      autoprefixer: {
        cascade: false
      },
	  "postcss-understrap-palette-generator" : {
		colors: [
			"--bs-blue",
			"--bs-indigo",
			"--bs-purple",
			"--bs-pink",
			"--bs-red",
			"--bs-orange",
			"--bs-yellow",
			"--bs-green",
			"--bs-teal",
			"--bs-cyan",
			"--bs-white",
			"--bs-gray",
			"--bs-gray-dark"
		]
	  }
    }
  }
}
