import path from 'path'
import dotenv from 'dotenv'
import StringReplacePlugin from 'string-replace-webpack-plugin'

dotenv.config({path: '../../.env'})

export default {
  entry: {
    ['GetComponents']: [
      'babel-polyfill',
      './src/getComponents/index.js'
    ]
  },
  output: {
    path: "./build/functions",
    library: "[name]",
    libraryTarget: "commonjs2",
    filename: "[name]/index.js"
  },
  target: "node",
  externals: { 'aws-sdk': 'commonjs aws-sdk' },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: [ 'es2015', 'stage-0' ]
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /validate.js$/,
        include: /node_modules\/json-schema/,
        loader: StringReplacePlugin.replace({ // from the 'string-replace-webpack-plugin'
          replacements: [{
            pattern: /\(\{define:typeof define!="undefined"\?define:function\(deps, factory\)\{module\.exports = factory\(\);\}\}\)\./ig,
            replacement: function(match, p1, offset, string) {
              return false;
            }
          }]
        })
      }
    ]
  },
  plugins: [
    new StringReplacePlugin(),
  ]
}