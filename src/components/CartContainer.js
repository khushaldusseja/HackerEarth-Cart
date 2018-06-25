import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCartItems } from '../actions';
import CartItemContainer from './CartItemContainer';

import styled from 'styled-components';
import { colors } from '../helpers/variables';

const Summary = styled.div`
  position: relative;
  float: left;
  width: 70%;
  padding-right: 20px;
`;
const HeaderStyle = styled.div`
  display: flex;
  align-items: center;
  min-height: 40px;
  border-bottom: 2px solid #efefef;
`;
const Title = styled(Link)`
  position: relative;
  font-size: 20px;
  color: #000000a8;
  ::before {
    display: inline-block;
    content: '';
    height: 15px;
    width: 15px;
    background-size: 15px;
    opacity: 0.7;
    margin-top: -3px;
    vertical-align: middle;
    text-align: center;
    transform: rotate(90deg);
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3C!DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%2232%22%20height%3D%2232%22%20viewBox%3D%220%200%2032%2032%22%3E%3Cpath%20d%3D%22M16%2025l-16-16%202-2%2014%2014.063%2014-14.063%202%202z%22%20fill%3D%22%23000000%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E');
    background-repeat: no-repeat;
  }
`;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  color: #000000a8;
  border-bottom: 2px solid #efefef;
  margin-bottom: 20px;
  min-height: 40px;
`;
const Item = styled.div`
  width: 60%;
`;
const Qty = styled.div`
  margin-left: 50px;
`;
const Price = styled.div`
  margin-left: 50px;
`;

const Total = styled.div`
  position: fixed;
  right: 10px;
  width: 30%;
  max-height: 250px;
  max-width: 300px;
  margin-top: 38px;
  color: #000000a8;
  border: 2px solid #efefef;
`;

const TotalDetails = styled.div`
  padding: 5px 10px;
  padding-bottom: 15px;
`;

const TotalPrice = styled.div`
  padding: 5px 10px;
  background-color: ${colors.gray};
`;

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
    console.log('%cCartContainer -- componentDidMount: this.props -> ', 'color: blue', this.props);
    dispatch(getCartItems());
  }

  componentWillReceiveProps(nextProps) {
    console.log('%cCartContainer -- componentWillReceiveProps: nextProps, this.props -> ', 'color: blue', nextProps, this.props);
  }

  render() {
    const { cartItems = [] } = this.props;
    const totalItems = cartItems.length;
    let totalPriceBeforeDiscount = 0;
    let discountPrice = 0;
    let discountTypePrice = 0;

    cartItems.forEach(({ id, name, price, discount, type, quantity = 1 }) => {
      price = quantity > 1 ? price * quantity : price;
      totalPriceBeforeDiscount += price;
      if (discount && type === 'fiction') {
        discountTypePrice += price - price * (discount + 15) / 100;
      } else if (discount) {
        discountPrice += price - price * discount / 100;
      }
    });

    const totalPrice = totalPriceBeforeDiscount - discountPrice - discountTypePrice;

    return (
      <div>
        <Summary>
          <HeaderStyle>
            <Title to="/">&nbsp;Order Summary</Title>
          </HeaderStyle>
          <TableHeader>
            <Item>Items ({cartItems.length})</Item>
            <Qty>Qty</Qty>
            <Price>Price</Price>
          </TableHeader>
          {cartItems.map((item, index) => <CartItemContainer key={item.id} item={item} index={index} />)}
        </Summary>
        <Total>
          <TotalDetails>
            <div className="h-font-style-bold">Total</div>
            <div className="h-margin-v-tight">
              <span>Items ({cartItems.length})</span>
              <span className="h-float-right">:&nbsp;&nbsp;${totalPriceBeforeDiscount.toFixed(2)}</span>
            </div>
            <div>
              <span>Discount</span>
              <span className="h-float-right">:&nbsp;&nbsp;-${discountPrice.toFixed(2)}</span>
            </div>
            <div>
              <span>Type discount</span>
              <span className="h-float-right">:&nbsp;&nbsp;-${discountTypePrice.toFixed(2)}</span>
            </div>
          </TotalDetails>
          <TotalPrice>
            <span>Order Total</span>
            <span className="h-float-right h-font-style-bold">&nbsp;&nbsp;${totalPrice.toFixed(2)}</span>
          </TotalPrice>
        </Total>
      </div>
    );
  }
}

Cart.propTypes = {
  dispatch: PropTypes.func,
  cartItems: PropTypes.array
};

function mapStateToProps(state) {
  console.log('%cCartContainer -- mapStateToProps: state -> ', 'color: green', state);
  const { cartItems } = state;
  return {
    cartItems
  };
}

export default connect(mapStateToProps)(Cart);
