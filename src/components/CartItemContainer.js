import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { removeItemFromCart, updateQuantityOfCartItem } from '../actions';

import styled from 'styled-components';
import { colors } from '../helpers/variables';

const CartWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const CartItem = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
  min-height: 50px;
  padding: 0px 6px;
  border: 1px solid ${colors.gray};
  box-shadow: 1px 1px 1px 0px #8080805e;
`;
const Image = styled.img`
  width: 35px;
  height: 35px;
`;
const Title = styled.div`
  margin-left: 5px;
  font-size: 14px;
`;
const Close = styled.a`
  margin-left: auto;
  padding: 10px;
`;

const Qty = styled.div`
  margin-left: 10px;
`;
const Input = styled.input`
  min-height: 50px;
  max-width: 50px;
  font-size: 15px;
  text-align: center;
`;
const IncrDecr = styled.a`
  padding: 10px;
  color: #000000a8;
`;
const Price = styled.div`
  margin-left: 10px;
  color: #000000a8;
`;

class CartItemContainer extends React.Component {
  constructor(props) {
    super(props);

    const { item = {} } = this.props;
    this.state = {
      quantity: item.quantity
    };
    this.OnRemoveItem = this.OnRemoveItem.bind(this);
    this.onQuantityChange = this.onQuantityChange.bind(this);
    this.onResetQuantity = this.onResetQuantity.bind(this);
    this.onQuantityIncrement = this.onQuantityIncrement.bind(this);
    this.onQuantityDecrement = this.onQuantityDecrement.bind(this);
  }

  componentDidMount() {
    console.log('%cCartItemContainer -- componentDidMount: this.props -> ', 'color: blue', this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log('%cCartItemContainer -- componentWillReceiveProps: nextProps, this.props -> ', 'color: blue', nextProps, this.props);
  }

  OnRemoveItem(e) {
    e.preventDefault();
    const { dispatch, item } = this.props;
    const { id } = item;
    dispatch(removeItemFromCart(id));
  }

  onQuantityChange(e) {
    e.preventDefault();
    const { dispatch, item } = this.props;
    const { id } = item;

    if (e.target.value <= 100) {
      this.setState(
        {
          quantity: e.target.value
        },
        () => {
          if (this.state.quantity > 0) {
            dispatch(updateQuantityOfCartItem(id, this.state.quantity));
          }
        }
      );
    }
  }
  onResetQuantity(e) {
    if (!this.state.quantity) {
      this.setState((prevState, props) => ({
        quantity: props.item.quantity
      }));
    }
  }
  onQuantityIncrement(e) {
    e.preventDefault();
    const { dispatch, item } = this.props;
    const { id } = item;

    this.setState(
      prevState => ({
        quantity: prevState.quantity < 100 ? Number(prevState.quantity) + 1 : prevState.quantity
      }),
      () => {
        dispatch(updateQuantityOfCartItem(id, this.state.quantity));
      }
    );
  }

  onQuantityDecrement(e) {
    e.preventDefault();
    const { dispatch, item } = this.props;
    const { id } = item;

    this.setState(
      prevState => ({
        quantity: prevState.quantity > 1 ? Number(prevState.quantity) - 1 : prevState.quantity
      }),
      () => {
        dispatch(updateQuantityOfCartItem(id, this.state.quantity));
      }
    );
  }

  render() {
    const { item = {}, index } = this.props;
    const { id, name, price, type, img_url } = item;
    const { quantity } = this.state;

    return (
      <CartWrapper className="h-margin-b-tight">
        <CartItem>
          <Image src={img_url} alt={`Item ${index}`} />
          <Title>{`Item ${index}`}</Title>
          <Close href="#" onClick={this.OnRemoveItem}>
            X
          </Close>
        </CartItem>
        <Qty>
          <IncrDecr href="#" onClick={this.onQuantityDecrement}>
            &ndash;
          </IncrDecr>
          <Input type="number" value={quantity} onChange={this.onQuantityChange} onBlur={this.onResetQuantity} min="1" max="100" />
          <IncrDecr href="#" onClick={this.onQuantityIncrement}>
            +
          </IncrDecr>
        </Qty>
        <Price className="h-font-style-bold">${price * quantity}</Price>
      </CartWrapper>
    );
  }
}

CartItemContainer.propTypes = {
  dispatch: PropTypes.func,
  item: PropTypes.object,
  index: PropTypes.number
};

function mapStateToProps(state) {
  console.log('%cCartItemContainer -- mapStateToProps: state -> ', 'color: green', state);
  return {};
}

export default connect(mapStateToProps)(CartItemContainer);
