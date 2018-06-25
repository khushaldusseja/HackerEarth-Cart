import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getLPItems, addItemToCart } from '../actions';
import LPItemContainer from './LPItemContainer';
import Notification from './common/Notification';

import styled from 'styled-components';

import { colors } from '../helpers/variables';

const HeaderStyle = styled.div`
  display: flex;
  align-items: center;
  min-height: 40px;
  border-bottom: 2px solid #efefef;
  margin-bottom: 20px;
`;
const Title = styled.div`
  position: relative;
  font-size: 20px;
`;
const CartButton = styled(Link)`
  position: relative;
  margin-left: auto;
  background-color: ${colors.blue};
  color: ${colors.white};
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 3px;
`;

const LPWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

class LPContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    };
    this.onAddToCart = this.onAddToCart.bind(this);
    this.onCloseNotification = this.onCloseNotification.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    console.log('%cLPContainer -- componentDidMount: this.props -> ', 'color: blue', this.props);
    dispatch(getLPItems());
  }

  componentWillReceiveProps(nextProps) {
    console.log('%cLPContainer -- componentWillReceiveProps: nextProps, this.props -> ', 'color: blue', nextProps, this.props);
  }

  onAddToCart({ id, name }) {
    const { dispatch } = this.props;

    if (this.timer) clearTimeout(this.timer);

    this.setState({
      message: `Notificaton: The Item with ID:${id} and Name:${name} is added to the Cart`
    });

    this.timer = setTimeout(() => {
      this.setState({
        message: ''
      });
    }, 3000);

    dispatch(addItemToCart(id));
  }

  onCloseNotification(e) {
    if (this.timer) clearTimeout(this.timer);

    this.setState({
      message: ''
    });
  }

  render() {
    const { lpItems = [], cartItems = [] } = this.props;
    const { message } = this.state;

    return (
      <div data-test="LPContainer">
        <HeaderStyle>
          <Title>All Items</Title>
          <CartButton to="/cart" className={cartItems.length > 0 ? '' : 'disabled'}>
            Go to Cart ({cartItems.length})
          </CartButton>
        </HeaderStyle>
        <LPWrapper>
          {lpItems.map((item, index) => <LPItemContainer onAddToCart={this.onAddToCart} key={item.id} item={item} index={index} />)}
        </LPWrapper>
        {message && <Notification message={message} onCloseNotification={this.onCloseNotification} />}
      </div>
    );
  }
}

LPContainer.propTypes = {
  dispatch: PropTypes.func,
  lpItems: PropTypes.array,
  cartItems: PropTypes.array
};

function mapStateToProps(state) {
  console.log('%cLPContainer -- mapStateToProps: state -> ', 'color: green', state);
  const { lpItems, cartItems } = state;
  return {
    lpItems,
    cartItems
  };
}

export default connect(mapStateToProps)(LPContainer);
