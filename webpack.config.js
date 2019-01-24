"use strict"
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, option) => {
	const config = {
		mode : option.mode,
		entry : {
			skycode : ["./src/index.js"]
		},
		output : {
			path : path.resolve(__dirname + "/dist"),
			filename : "[name].js",
			library : "skycode",
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
		}
	};
	if(option.mode === "development"){
		config.plugins = [
			new HtmlWebpackPlugin({
				template : "./index.html",
				filename : "./index.html",
				inject : false
			}),
			new webpack.HotModuleReplacementPlugin()
		]
	};
	return config;
};