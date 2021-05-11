const webpack = require("webpack"); // eslint-disable-line no-unused-vars
const path = require("path");
const PolyfillInjectorPlugin = require("webpack-polyfill-injector");

function getPolyfilledEntryPoint(entryPoint) {
  return `webpack-polyfill-injector?${JSON.stringify({
    modules: [
      "./node_modules/regenerator-runtime/runtime.js",
      entryPoint,
    ],
  })}!`;
}

module.exports = {
  context: __dirname,
  entry: {
    main: getPolyfilledEntryPoint("./main.js"),
    "pdf.worker": "pdfjs-dist/es5/build/pdf.worker.entry",
  },
  mode: "none",
  output: {
    path: path.join(__dirname, "dist/"),
    publicPath: "./",
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|src\/libs\/)/,
        use: {
          loader: "babel-loader",
          options: {
            cacheCompression: false,
            cacheDirectory: true,
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new PolyfillInjectorPlugin({
      polyfills: [
          // Remove this an PDF.js works:
          "Object.fromEntries",

          // One unrelated dependency so that this array is not empty (when editng)
          "URL",
      ],
      singleFile: true,
      filename: "[name].[contenthash].js",
    }),
  ],
};
