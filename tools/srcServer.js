import express from 'express';
import webpack from 'webpack';
import path from 'path';
import colors from 'colors';
const config = require('../webpack.config.dev');
import open from 'open';

/* eslint-disable no-console */
const port = 3004;
const app = express();
const compiler = webpack(config);
const history = require('connect-history-api-fallback');

app.use(
  require('webpack-dev-middleware')(compiler, {
    historyApiFallback: true,
    noInfo: true,
    publicPath: config.output.publicPath
  })
);

app.use(require('webpack-hot-middleware')(compiler));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`listening on ${port}`.green);
  }
});
