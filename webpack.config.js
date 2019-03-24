const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cleanPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
         test: /\.css$/,
         use: [
           'style-loader',
           'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
           // 'css-loader'
           "postcss-loader"
         ]
       },
       {
         test: /\.(sass|scss)$/,
         use: [
          "style-loader",
          "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]",
          "postcss-loader",
          "sass-loader"
         ]
       },
       {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use:
            {
              loader: 'url-loader?limit=8000&name=img/[name].[ext]',
            }
        }
    ]
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new cleanPlugin(['build']),
    new HtmlWebpackPlugin({
      inject: true,
      template: './src/index.html'
    }),
    // new InjectManifest({
    //   swSrc: './src/src-sw.js',
    //   swDest: 'dist-sw.js'
    // }),
    new CopyWebpackPlugin(['./manifest.json', './app-images', './favicon.ico'])
  ]
}
