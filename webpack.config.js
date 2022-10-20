const HtmlWebpackPlugin = require('html-webpack-plugin'),
  { resolve } = require('path')
  
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname,'public/index.html')
    })
  ],
  devServer: {
    port: 8080,
    hot: true,
    open: true
  }
}