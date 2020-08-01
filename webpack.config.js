require('dotenv/config');
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
  const plugins = [
    new HtmlWebpackPlugin({
      template: './client/index.html'
    })
  ];

  return {
    entry: {
      main: [
        'babel-polyfill',
        'react-hot-loader/patch',
        './client/index.jsx'
      ]
    },
    output: {
      path: resolve(__dirname, './dist/client'),
      publicPath: '/',
      filename: './[name].[hash].js',
      chunkFilename: './[name].[chunkhash].js'
    },
    devtool: 'eval-source-map',
    optimization: {
      usedExports: true
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: ['babel-loader'],
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom'
      },
      extensions: ['.js', '.jsx']
    },
    plugins,
    devServer: {
      port: process.env.WEBPACK_PORT,
      inline: true,
      historyApiFallback: true,
      hot: true,
      proxy: {
        '/api': {
          target: `http://localhost:${process.env.PORT}`
        }
      }
    }
  };
};
