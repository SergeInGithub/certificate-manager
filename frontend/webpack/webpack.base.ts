import { Configuration, DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import dotenv from 'dotenv';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';

dotenv.config({ path: './.env' });

const baseConfig: Configuration = {
  entry: path.join(__dirname, '../src/index.tsx'),
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.join(__dirname, '../dist'),
    clean: true,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack5-react-ts',
      filename: 'index.html',
      template: path.join(__dirname, '../public/index.html'),
      inject: true,
      hash: true,
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
      },
    }),
    new DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
};
export default baseConfig;
