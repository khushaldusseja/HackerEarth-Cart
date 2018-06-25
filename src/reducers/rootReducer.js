import { combineReducers } from 'redux';
import { combineForms, createForms } from 'react-redux-form';
// import { formReducer } from 'react-redux-form';

import lpItems from './lpItems';
import cartItems from './cartItems';

const rootReducer = combineReducers({
  lpItems,
  cartItems
});

export default rootReducer;
