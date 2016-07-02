'use strict'

var path = require("path");
var webpack = require("webpack");
var pkg = require('./package.json');
var banner = `${pkg.name} v${pkg.version}\n${pkg.description}\n${pkg.homepage}\n@author ${pkg.author}`;

module.exports = {
	entry: {
		'vue-count-down': path.join(__dirname, 'src/vue-count-down.js')
	},
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '/',
		filename: "[name].js"
	},
	module: {
		loaders: [{
			test: /\.vue$/,
			loader: 'vue',
		}, {
			test: /\.js$/,
			loader: 'babel',
			exclude: /node_modules/
		}]
	},
	babel: {
		"presets": ["es2015"]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.BannerPlugin(banner)
	]
};