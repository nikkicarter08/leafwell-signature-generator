const path = require("path");
const webpack = require("webpack");
const copyWebpackPlugin = require("copy-webpack-plugin");
const uglifyJsPlugin = require("uglifyjs-webpack-plugin");
const bundleOutputDir = "./dist";

module.exports = (env) => {
  const isDevBuild = !(env && env.prod);

  return [
    {
      entry: "./src/main.js",
      output: {
        filename: "signature.js",
        path: path.resolve(bundleOutputDir),
      },
      devServer: {
        contentBase: bundleOutputDir,
      },
      optimization: {
        minimizer: [
          // we specify a custom UglifyJsPlugin here to get source maps in production
          new uglifyJsPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
              compress: false,
              ecma: 6,
              mangle: true,
            },
            sourceMap: false,
          }),
        ],
      },
      plugins: isDevBuild
        ? [
            new webpack.SourceMapDevToolPlugin(),
            new copyWebpackPlugin([{ from: "demo/" }]),
          ]
        : [new copyWebpackPlugin([{ from: "demo/" }])],
      module: {
        rules: [
          { test: /\.html$/i, use: "html-loader" },
          {
            test: /\.(scss|css|sass)$/,
            use: [
              "style-loader",
              "css-loader",
              "postcss-loader",
              "sass-loader",
            ],
          },
          {
            // Load all images as base64 encoding if they are smaller than 8192 bytes
            test: /\.(png|jpg|gif|svg|ico)$/,
            use: [
              {
                loader: "url-loader",
                options: {
                  limit: 8192,
                  outputPath: "images/",
                  publicPath: "dist/images/",
                },
              },
            ],
          },
          {
            test: /\.js$/i,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  [
                    "@babel/env",
                    {
                      targets: {
                        browsers: ["ie 10", "safari 7"],
                      },
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    },
  ];
};
