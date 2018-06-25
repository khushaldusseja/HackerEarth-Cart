import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

import rootReducer from '../reducers/rootReducer';

export default function configureStore(history) {
  return createStore(
    connectRouter(history)(rootReducer),
    compose(applyMiddleware(thunk, reduxImmutableStateInvariant(), routerMiddleware(history), logger))
  );
}
