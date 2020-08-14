const Paths = require('./paths')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const NoEmitOnErrorsPlugin = require('webpack/lib/NoEmitOnErrorsPlugin')
const OccurrenceOrderPlugin = require('webpack/lib/optimize/OccurrenceOrderPlugin')
const AggressiveMergingPlugin = require('webpack/lib/optimize/AggressiveMergingPlugin')
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin')
const SourceMapDevToolPlugin = require ('webpack/lib/SourceMapDevToolPlugin')

module.exports = module.exports = [
  'source-map'
].map(devtool=>({
  entry: {
    index: './src/index.js',
  },
  devtool,
  optimization: {
    minimize: false,
    runtimeChunk: true
  },
  performance: {
    hints: false,
  },
  output: {
    path: Paths.outputPath,
    filename: '[name].js',
    libraryTarget: 'umd',
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
        loaders: ['babel-loader'],
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
    // new SourceMapDevToolPlugin({
    //   filename: '[name].js.map'
    // }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
})
)
