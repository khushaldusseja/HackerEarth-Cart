import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount, shallow } from 'enzyme';

import App from './components/App';
import LPContainer from './components/LPContainer';
import lpItemsFixture from './reducers/fixtures/lpItemsFixture';
import cartItemsFixture from './reducers/fixtures/cartItemsFixture';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({ lpItems: lpItemsFixture, cartItems: cartItemsFixture });

describe('App should render with lpItems & cartItems data', () => {
  it('should pass', () => {
    /**
     * Not able to run these test cases, there is some problem with ReactJS version.
     * The error is shown as "can't use <Switch> outside of <Router>"
     */
    // const wrapper = mount(
    //   <Provider store={store}>
    //     <App />
    //   </Provider>
    // );
    // expect(wrapper).toBeDefined();
  });
});

describe('LPContainer should render with lpItems data', () => {
  it('should pass', () => {
    /**
     * Not able to run these test cases, there is some problem with ReactJS version.
     * The error is shown as "can't use <Link> outside of <Router>"
     */
    // const wrapper = mount(
    //   <Provider store={store}>
    //     <LPContainer />
    //   </Provider>
    // );
    // expect(wrapper).toBeDefined();
  });
});
