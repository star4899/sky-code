"use strict"
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, option) => {
	const config = {
		mode : option.mode,
		entry : ["@babel/polyfill", "./src/index.js"],
		output : {
			path : path.resolve(__dirname + "/dist"),
			filename : "skycode.js",
			library : "skyCode",
			libraryTarget : "umd"
		},
		module : {
			rules : [
				{
					test : /\.js$/,
					exclude : /node_modules/,
					use : {
						loader : "babel-loader",
						options : {
							presets : ["@babel/preset-env"]
						}
					}
				}
			]
		},
		plugins : [
			new HtmlWebpackPlugin({
				template : "./index.html",
				filename : "../example/index.html",
				inject : false
			})
		]
	};
	if(option.mode === "development"){
		config.plugins = [
			new webpack.HotModuleReplacementPlugin()
		]
	};
	return config;
};