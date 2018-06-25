import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, StaticRouter, Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import routes from './routes/routes';
import configureStore from './store/configureStore';

import storage from './helpers/StorageHelper';

const history = createBrowserHistory();
const store = configureStore(history);
console.log('src/index.js : store.getState() -> ', store.getState());

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>{routes}</ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
