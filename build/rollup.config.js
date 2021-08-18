'use strict'

const path = require('path')
const { babel } = require('@rollup/plugin-babel')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const banner = require('./banner.js')

let fileDest = 'theme.js'
const external = ['jquery', 'popper.js']
const plugins = [
  babel({
    // Only transpile our source code
    exclude: 'node_modules/**',
    // Include the helpers in the bundle, at most one copy of each
    babelHelpers: 'bundled'
  })
]
const globals = {
  jquery: 'jQuery', // Ensure we use jQuery which is always available even in noConflict mode
  'popper.js': 'Popper'
}


fileDest = 'theme.js'
// Remove last entry in external array to bundle Popper
external.pop()
delete globals['popper.js']
plugins.push(nodeResolve())


module.exports = {
  input: path.resolve(__dirname, '../src/js/custom-javascript.js'),
  output: {
    banner,
    file: path.resolve(__dirname, `../js/${fileDest}`),
    format: 'umd',
    globals,
    name: 'understrap'
  },
  external,
  plugins
}