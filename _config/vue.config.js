const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

let configEnv = process.env.NODE_ENV
console.log('vue.config.NODE_ENV', configEnv)
const config = process.env._CONFIG
console.log('vue.config._CONFIG', config)
if (config) {
	const filename = path.join(__dirname, `./src/config/${configEnv}.json`)
	console.log('vue.config.filename', filename)
	fs.writeFileSync(filename, config)
	const contents = fs.readFileSync(filename,'utf8')
	console.log('vue.config.file', contents)
}
else
	configEnv = 'development'
console.log('vue.config.NODE_ENV', configEnv)

module.exports = {
	devServer: {
		port: 9090
	},
	pages: {
		'index': {
			entry: './src/main.js',
			template: 'public/index.html',
			title: 'Home',
			chunks: [ 'chunk-vendors', 'chunk-common', 'index' ]
		}
	},
	configureWebpack: {
		devtool: 'source-map',
		module: {
			rules: [
				{
					test: /locales/,
					loader: '@alienfast/i18next-loader',
					// options here
					//query: { overrides: [ '../node_modules/lib/locales' ] }
				}
			]
		},
		plugins: [
			// new BundleAnalyzerPlugin(),
			new BundleAnalyzerPlugin({analyzerMode: 'static', openAnalyzer: false}),
			new webpack.ContextReplacementPlugin(
				/highlight\.js\/lib\/languages$/,
				new RegExp(`^./(${['javascript'].join('|')})$`),
			),
			// new VuetifyLoaderPlugin()
		],
		resolve: {
			alias: {
				'local-config': path.join(__dirname, `./src/config/${configEnv}.json`)
			}
		}
	},
	css: {
		extract: { ignoreOrder: true },
	}
}