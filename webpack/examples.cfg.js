const Paths = require('./paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OccurrenceOrderPlugin = require('webpack/lib/optimize/OccurrenceOrderPlugin')
const AggressiveMergingPlugin = require('webpack/lib/optimize/AggressiveMergingPlugin')

const config = {
  entry: {
    examples: Paths.entryPath,
  },
  output: {
    path: Paths.buildPath,
    filename: 'index.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  performance: {
    hints: false,
  },
  cache: true,
  module: {
    rules: [
      { test: /\.html$/, loader: 'html-loader', exclude: /base\.html$/ },
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
      // {
      //   test: /\.(jpe?g|png|gif|svg)$/,
      //   loader: 'file-loader',
      //   options: {
      //     outputPath: 'assets',
      //   },
      // },
    ],
  },
  plugins: [
    new UglifyJsPlugin(),
    new OccurrenceOrderPlugin(),
    new AggressiveMergingPlugin(),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new HtmlWebpackPlugin({
      title: 'React Sketch',
      description: 'Sketch Element for React based applications, backed-up by fabricjs as its core',
      keywords: ['react', 'canvas', 'sketch', 'fabricjs', 'fabric.js'],
      template: Paths.templatePath,
      filename: 'index.html',
      chunks: ['examples'],
      inject: 'body',
    }),
  ],
}

module.exports = config
