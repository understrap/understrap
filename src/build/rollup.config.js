'use strict'

const path = require('path')
const { babel } = require('@rollup/plugin-babel')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
import commonjs from '@rollup/plugin-commonjs'
import multi from '@rollup/plugin-multi-entry'
const replace = require('@rollup/plugin-replace')
const banner = require('./banner.js')

let fileDest = 'theme.js'
const external = ['jquery']
const plugins = [
  babel({
    // Only transpile our source code
    exclude: 'node_modules/**',
    // Include the helpers in the bundle, at most one copy of each
    babelHelpers: 'bundled'
  }),
  replace({
      'process.env.NODE_ENV': '"production"',
      preventAssignment: true
  }),
  nodeResolve(),
  commonjs(),
  multi()
]
const globals = {
  jquery: 'jQuery', // Ensure we use jQuery which is always available even in noConflict mode
}


module.exports = {
  input: [path.resolve(__dirname, '../js/bootstrap.js'), path.resolve(__dirname, '../js/skip-link-focus-fix.js'), path.resolve(__dirname, '../js/custom-javascript.js')],
  output: {
    banner,
    file: path.resolve(__dirname, `../../js/${fileDest}`),
    format: 'umd',
    globals,
    name: 'understrap'
  },
  external,
  plugins
}
