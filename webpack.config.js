"use strict"
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = () => {
	const config = {
		entry : "./src/index.js",
		output : {
			path : path.resolve(__dirname + "/dist"),
			filename : "skyCode.js"
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
	};
	return config;
};