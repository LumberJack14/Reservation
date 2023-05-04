const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[contenthash].js",
  },
  target: "web",
  devServer: {
    port: "3000",
    static: ["./build"],
    open: true,
    hot: true,
    liveReload: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./public/index.html",
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./public/assets/favicon.ico"),
          to: path.resolve(__dirname, "./build"),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.(ttf|otf|woff|woff2)$/i,
        use: ["file-loader"],
      },
    ],
  },
};
