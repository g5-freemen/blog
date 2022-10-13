const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = (_, argv) => ({
  devtool: argv.mode === 'production' ? 'source-map' : 'inline-source-map',
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext][query]',
        },
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    publicPath: '',
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[fullhash].js',
    asyncChunks: true,
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    static: path.join(__dirname, 'public'),
    historyApiFallback: true,
    compress: true,
    hot: true,
    open: true,
    port: 4000,
    client: {
      progress: true,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      favicon: path.resolve(__dirname, 'public', 'favicon.png'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[fullhash].css',
    }),
    new CompressionPlugin({
      filename: '[path][base].gz',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      algorithm: 'gzip',
      minRatio: 0.8,
      threshold: 8192,
      exclude: /.map$/,
    }),
  ],
});
