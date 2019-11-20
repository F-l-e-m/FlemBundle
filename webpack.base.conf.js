const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATHS = {
	src: path.join(__dirname, './src'),
	dist: path.join(__dirname, './dist'),
	assets: 'assets'
}


module.exports = {

	externals: {
		paths: PATHS
	},
	entry: {
		app: PATHS.src
	},
	output: {
		filename: `${PATHS.assets}/js/[name].[hash].js`,
		path: PATHS.dist,
		publicPath: '/'
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /node_modules/,
					name: 'vendors',
					chunks: 'all',
					enforce: true
				}
			}
		}
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: `${PATHS.assets}/css/[name].[contenthash].css`
		}),
		new HtmlWebpackPlugin({
			template: `${PATHS.src}/index.html`,
			filename: './index.html',
			inject: false
		}),
		new CopyWebpackPlugin([
			{
				from: `${PATHS.assets}/img`,
				to: `${PATHS.assets}/img`
			},
			{
				from: `${PATHS.assets}/fonts`,
				to: `${PATHS.assets}/fonts`
			},
			{
				from: `${PATHS.src}/static`,
				to: ``
			}
		])
	],
	module: {
	    rules: [
	   	 	{
	   	 	  test: /\.css$/,
	   	 	  use: [
						'style-loader',
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: { sourceMap: true }
						},
						{
							loader: 'postcss-loader',
							options: { sourceMap: true, config: { path: `./postcss.config.js` } }
						}
	   	 	  ],
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: { sourceMap: true }
					},
					{
						loader: 'postcss-loader',
						options: { sourceMap: true, config: { path: `./postcss.config.js` } }
					},
					{
						loader: 'sass-loader',
						options: { sourceMap: true }
					}
				],
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: '/node_modules/'
			},
	   	 	{
	   	 	  test: /\.(png|svg|jpg|gif)$/,
	   	 	  loader: 'file-loader',
				options: {
					name: '[name].[ext]'
				}
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file-loader',
			  	options: {
				  name: '[name].[ext]'
			  }
			},
		]
	},
	resolve: {
		alias: {
			'~': 'src'
		}
	}
};