const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const PRODUCTION = false;

module.exports = {
  devServer: {
    static: {
      publicPath: path.resolve(__dirname, "../public"),
      watch: true,
    },
    host: "localhost",
    port: 8080,
    open: true,
  },

  mode: PRODUCTION ? "production" : "development",
  devtool: PRODUCTION ? undefined : "eval-source-map",

  entry: {
    auctionner: path.resolve(__dirname, "src", "scripts", "auctionner.js"),
    bidder: path.resolve(__dirname, "src", "scripts", "bidder.js"),
  },

  output: {
    path: path.resolve(__dirname, "../public"),
    filename: "[name]/[name].js",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/pages/auctionner.html",
      filename: "./auctionner/auctionner.html",
      chunks: ["auctionner"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/bidder.html",
      filename: "./bidder/bidder.html",
      chunks: ["bidder"],
    }),
    new CopyPlugin({
      patterns: [
        {
          context: path.resolve(__dirname, "src", "pages"),
          from: "**/about.html",
          to: "pages",
        },
        {
          context: path.resolve(__dirname, "src", "pages"),
          from: "**/home.html",
          to: "pages",
        },
        {
          context: path.resolve(__dirname, "src", "pages"),
          from: "**/error.html",
          to: "pages",
        },
        {
          context: path.resolve(__dirname, "src", "images"),
          from: "**/*.jpg",
          to: "images",
        },
        {
          context: path.resolve(__dirname, "src", "style"),
          from: "**/*.css",
          to: "style",
        },
      ],
    }),
  ],
};
