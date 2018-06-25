import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LPContainer from './LPContainer';
import CartContainer from './CartContainer';

import styled from 'styled-components';
import GlobalStyles from '../GlobalStyles';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    console.log('%cApp -- componentDidMount: this.props -> ', 'color: blue', this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log('%cApp -- componentWillReceiveProps: nextProps, this.props -> ', 'color: blue', nextProps, this.props);
  }

  render() {
    return (
      <GlobalStyles>
        <div className="wrapper">
          <div className="container">
            <Switch>
              <Route exact path="/" component={LPContainer} />
              <Route path="/cart" component={CartContainer} />
            </Switch>
          </div>
        </div>
      </GlobalStyles>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  console.log('%cApp -- mapStateToProps: state -> ', 'color: green', state);
  return {};
}
export default connect(mapStateToProps)(App);
