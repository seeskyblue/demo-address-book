/* eslint-disable compat/compat */
const nodePath = require('path');

const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const getGitInfo = require('git-repo-info');

const pkg = require('./package.json');

const git = getGitInfo();

const base = __dirname;
const src = nodePath.resolve(base, 'src');
const dist = nodePath.resolve(base, 'dist');
const build = nodePath.resolve(base, 'build');
const content = nodePath.resolve(base, 'public');
const path = { base, src, dist, content, build };

const image = [/\.(bmp|gif|jpe?g|png|svg)$/];
const font = [/\.(woff|woff2|ttf|eot|svg)(\?t=[0-9]+)?$/];
const html = [/\.html$/];
const json = [/\.json$/];
const source = [/\.(js|jsx)$/];
const style = [/\.css$/];
const type = { image, font, html, json, source, style };

const protocol = 'http:';
const host = '0.0.0.0';
const port = 3000;
const config = {
  protocol,
  host,
  port,
};

function createDevprod(env = 'production') {
  return function devprod(dev, prod) {
    return env === 'production' ? prod : dev;
  };
}

module.exports = function webpackConfig(env = {}) {
  const devprod = createDevprod(env.NODE_ENV);

  return {
    mode: devprod('development', 'production'),
    // mode: 'development',

    context: path.base,

    devtool: devprod(
      'cheap-module-source-map',
      'hidden-cheap-module-source-map'
    ),

    entry: {
      [pkg.name]: ['normalize.css', './src/index.js'],
    },

    output: {
      path: devprod(path.dist, path.build),
      filename: `[name].${git.sha}.js`,
      chunkFilename: `[name].[contenthash].js`,
      publicPath: devprod('/', '/static/survey/'),
    },

    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
      runtimeChunk: devprod(undefined, 'single'),
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },

    devServer: devprod({
      contentBase: path.content,
      historyApiFallback: true,
      host: config.host,
      hot: true,
      overlay: true,
      port: config.port,
      useLocalIp: true,
    }),

    module: {
      rules: [
        {
          exclude: [
            ...type.html,
            ...type.json,
            ...type.image,
            ...type.source,
            ...type.style,
          ],
          loader: 'file-loader',
          options: {
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
        {
          test: type.image,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
        {
          test: type.source,
          include: [
            nodePath.join(base, 'node_modules/react-intl'),
            nodePath.join(base, 'node_modules/intl-messageformat'),
            nodePath.join(base, 'node_modules/intl-messageformat-parser'),
          ],
          loader: 'babel-loader',
          // options: {
          //   rootMode: 'upward',
          // },
        },
        {
          test: type.source,
          exclude: [/node_modules/],
          loader: 'babel-loader',
          // options: {
          //   rootMode: 'upward',
          // },
        },
        {
          test: type.style,
          use: [
            devprod('style-loader', { loader: MiniCssExtractPlugin.loader }),
            'css-loader',
          ],
        },
      ],
    },

    plugins: [
      new webpack.DefinePlugin({
        __VERSION__: JSON.stringify(pkg.version),
        __BASE_PATH__: JSON.stringify(pkg.basePath),
        __DEVELOPMENT__: devprod(true, false),
        __GIT_BRANCH__: JSON.stringify(git.branch),
        __GIT_REVISION__: JSON.stringify(git.sha),
      }),
      new webpack.HashedModuleIdsPlugin(),
      new MiniCssExtractPlugin({
        filename: `[name].[contenthash].css`,
        chunkFilename: `[name].[contenthash].css`,
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        inject: true,
        template: nodePath.resolve(path.content, 'index.html'),
      }),
    ],

    resolve: {
      modules: [path.src, 'node_modules'],
      extensions: ['.js', '.jsx', '.json'],
    },
  };
};
