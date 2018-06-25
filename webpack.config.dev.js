const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    // 2nd arguement 'webpack-hot-middleware/client?reload=true' is to connect HMR(Hot Module Replacement) to the browser.
    main: [path.resolve(__dirname, 'src/index')]
  },
  /**
   * ‘eval’/'source-map’/'hidden-source-map’/'inline-source-map’/'eval-source-map’/'cheap-source-map’/'cheap-module-source-map’
   * In developer-tools chrome/firefox, along with bundle.js, it will also show original folders/files for debugging purpose.
   */
  devtool: 'inline-source-map',
  /**
   * 'web'/'webworker'/'node'/'async-node'/'node-webkit'/'electron'/'electron-renderer'
   * webpack can compile project-files (js/css/jsx etc..) in different modes.
   * 
   * target: 'node' -> webpack will compile for usage in node.js like environments (use require to load chunks)
   * target: 'web' -> webpack will compile for usage in a browser-like environment (default).
   */
  target: 'web',
  devServer: {
    // "host, disableHostCheck" are to enable run this app over wifi-network on mobile phones eg: 192.168.1.3:3003
    // host: '192.168.1.3',
    // disableHostCheck: true,
    // publicPath: path.resolve(__dirname, '/'),
    // contentBase: path.resolve(__dirname, '/src'),
    // contentBase: path.join(__dirname, "src"),
    // compress: true,
   /**
    * If 'historyApiFallback: true' is not used, then direct hitting/refreshing on urls like '/1 OR /2' will not load the pages.
    * When 'historyApiFallback: true' is used, then when direct urls like '/1 OR /2' are hitted/refreshed,
    *  then first this will load pages/files for '/' url, & then will load pages/files for '/1 or /2', so page will be loaded properly.
    */
    historyApiFallback: true,
    hot: true,
    // noInfo: true -> will not show messages/information like webpack bundle information in the terminal when "npm start OR npm run build" is hit.
    noInfo: false,
    // inline: true -> a small webpack-dev-server client entry is added to the bundle which refresh the page on change.
    inline: true,
    port: 3004
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
    filename: 'bundle.js'
    // publicPath: path.resolve(__dirname, '/')
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),
    // new webpack.DefinePlugin({ 
    //   'process.env': {
    //     'NODE_ENV': JSON.stringify('production')
    //   }
    // }),
    // new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new HtmlWebpackPlugin({
        template: './src/index.html'
    })
  ],
  module: {
    rules: [
      // {
      //   test: /\.html$/,
      //   use: 'raw-loader'
      // },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: [
          { loader: 'url-loader' },
          { loader: 'img-loader' }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        use: 'babel-loader'
      },
      // if loader is array use "loaders" (extra 's'), otherwise just loader
      {
        test: /(\.css)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000'
      }
    ]
  }
};
