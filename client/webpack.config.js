// Import the necessary modules from Node.js and plugins for webpack.
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Entry point: Specifies the initial file that starts your app. webpack will use this to build the dependency graph.
  entry: './src/index.js',

  // Output: Tells webpack where to emit the bundles it creates and how to name these files.
  output: {
    path: path.resolve(__dirname, 'dist'), // Directory where the output file will be placed.
    filename: 'bundle.js' // The name of the single JavaScript file that will be generated.
  },

  // Module rules: Defines how different file types are processed by webpack.
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Matches files with .js or .jsx extension.
        exclude: /node_modules/, // Excludes the node_modules directory to speed up the process.
        use: {
          loader: 'babel-loader' // Uses babel-loader to transpile ES6+ and JSX into compatible JavaScript.
        }
      },
      {
        test: /\.css$/, // Matches .css files.
        use: ['style-loader', 'css-loader'] // Processes CSS files. css-loader reads the CSS. style-loader injects it into the DOM.
      }
    ]
  },

  // Resolve: Helps webpack resolve the file extensions. Allows us to import files without specifying their extensions.
  resolve: {
    extensions: ['.js', '.jsx'] // Tells webpack to automatically resolve files with these extensions.
  },

  // Plugins: Adds additional functionality to the webpack build process.
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Specifies the template HTML file. webpack will inject the output script into this file.
    })
  ],

  // Configuration for webpack's development server.
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Directory to serve files from. Here, it's the output directory.
    },
    compress: true, // Enables gzip compression to serve files smaller and faster.
    port: 8080 // Port number on which to run the development server.
  }
};
