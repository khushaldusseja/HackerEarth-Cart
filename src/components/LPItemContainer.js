import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styled from 'styled-components';
import { colors } from '../helpers/variables';

const LPItem = styled.div`
  position: relative;
  min-width: 235px;
  min-height: 250px;
  border: 1px solid ${colors.gray};
  margin-right: 20px;
  margin-top: 20px;
  box-shadow: 1px 1px 1px 0px #8080805e;
`;

const ImageContainer = styled.div`
  height: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Discount = styled.span`
  position: absolute;
  left: -1px;
  top: 20px;
  font-size: 14px;
  background-color: ${colors.green};
  color: ${colors.white};
  padding: 5px;
`;
const Image = styled.img`
  width: 140px;
  height: 140px;
`;

const DetailsContainer = styled.div`
  height: 25%;
  background-color: ${colors.gray};
  padding: 5px;
`;

const Title = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
`;

const PriceCart = styled.div`
  display: flex;
`;
const DiscountPrice = styled.div`
  margin-right: 5px;
  text-decoration: line-through;
  color: red;
  font-style: italic;
  span {
    color: gray;
  }
`;
const Price = styled.div``;
const AddToCart = styled.button`
  cursor: pointer;
  background-color: ${colors.blue};
  color: ${colors.white};
  padding: 5px 10px;
  border-radius: 2px;
  border: 1px solid ${colors.blue};
  margin-left: auto;
  &&:hover {
    background-color: transparent;
    color: ${colors.blue};
  }
`;

class LPItemContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onHandleAddToCart = this.onHandleAddToCart.bind(this);
  }

  onHandleAddToCart() {
    const { dispatch, item, onAddToCart } = this.props;
    const { id } = item;
    onAddToCart(item);
  }

  render() {
    const { item = {}, index } = this.props;
    const { id, name, price, type, img_url } = item;
    let { discount } = item;
    discount = type === 'fiction' && discount ? discount + 15 : discount;
    const discountPrice = discount ? price - price * discount / 100 : 0;

    return (
      <LPItem key={id}>
        <ImageContainer>
          {discount > 0 && <Discount>{`${discount}% off`}</Discount>}
          <Image src={img_url} alt={`Item ${index}`} />
        </ImageContainer>
        <DetailsContainer>
          <Title>{`Item ${index}`}</Title>
          <PriceCart>
            {discount > 0 && (
              <DiscountPrice>
                <span>{`$${price}`}</span>
              </DiscountPrice>
            )}
            <Price>{`$${discountPrice ? discountPrice : price}`}</Price>
            <AddToCart onClick={this.onHandleAddToCart}>Add to Cart</AddToCart>
          </PriceCart>
        </DetailsContainer>
      </LPItem>
    );
  }
}

LPItemContainer.propTypes = {
  dispatch: PropTypes.func,
  item: PropTypes.object,
  onAddToCart: PropTypes.func,
  index: PropTypes.number
};

export default LPItemContainer;
