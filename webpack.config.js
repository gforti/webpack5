const UI_ENV_VARS = require('./environment.build')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
//const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin')
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const { resolve } = require('path')

module.exports = (env, argv) => {
  const IS_BUILD = env.WEBPACK_BUILD
  return {
    devServer: {
      historyApiFallback: {
        rewrites: [
          { from: /.*\.html?/, to: '/' },
          { from: /^[\w/]+$/, to: '/' },
        ],
        verbose: true
      },
      host: '0.0.0.0',
      open: true,
      port: UI_ENV_VARS.UI_APP_PORT,
    },
    entry: './src/main.js',
    externals: {
        environment: JSON.stringify(UI_ENV_VARS)
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.html$/i,
          exclude: /index\.html$/i,
          type: 'asset/source',
        },
      ],
    },
    output: {
      assetModuleFilename: 'assets/[name][ext]',
      clean: true,
      filename: 'main.js',
      path: resolve(__dirname, 'dist'),
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        base: IS_BUILD ? false : '/',
        inject: 'body',
        template: './src/index.html',
        scriptLoading: 'module'
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: './assets', globOptions: { ignore: ['*.js'] }, to: 'assets' },
          //{ from: 'serve.template.js', to: 'serve.js', transform: transformContent },
          //{ from: 'package.template.json', to: 'package.json', transform: transformContent },
          //{ from: 'LICENSE.md', to: 'LICENSE.md' },
        ]
      })
    ],
    resolve: {
      alias: {
        components: resolve(__dirname, 'src/components'),
        //elements: resolve(__dirname, 'src/elements'),
        features: resolve(__dirname, 'src/features'),
        //mixins: resolve(__dirname, 'src/mixins'),
        services: resolve(__dirname, 'src/services'),
        templates: resolve(__dirname, 'src/templates')
      },
      extensions: ['.js']
    },
  }
}
