"use strict"
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

<<<<<<< HEAD
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
=======
module.exports = () => {
	const config = {
		entry : "./src/index.js",
		output : {
			path : path.resolve(__dirname + "/dist"),
			filename : "skyCode.js"
>>>>>>> 557758511cf1922949408b36940cf19a4544780b
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
<<<<<<< HEAD
		externals: {
			skyCode : "skycode"
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
=======
		plugins: [
			new HtmlWebpackPlugin({
				template : "./index.html",
				filename : "./index.html",
				inject : true
			}),
			new webpack.HotModuleReplacementPlugin()
		],
		optimization: {
		},
		resolve : {
			alias : {
			}
		}
>>>>>>> 557758511cf1922949408b36940cf19a4544780b
	};
	return config;
};