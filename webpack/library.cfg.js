const Paths = require('./paths')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const TerserPlugin = require('terser-webpack-plugin')
const NoEmitOnErrorsPlugin = require('webpack/lib/NoEmitOnErrorsPlugin')
const OccurrenceOrderPlugin = require('webpack/lib/optimize/OccurrenceOrderPlugin')
const AggressiveMergingPlugin = require('webpack/lib/optimize/AggressiveMergingPlugin')
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin')
// const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
  },
  performance: {
    hints: false,
  },
  output: {
    path: Paths.outputPath,
    filename: '[name].js',
    libraryTarget: 'umd',
    chunkFilename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  cache: true,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components|lib)/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
    ],
  },
  plugins: [
    new ModuleConcatenationPlugin(),
    new NoEmitOnErrorsPlugin(),
    new OccurrenceOrderPlugin(),
    new AggressiveMergingPlugin(),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
}
