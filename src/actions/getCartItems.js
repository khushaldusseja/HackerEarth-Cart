import lpItemsFixture from '../reducers/fixtures/lpItemsFixture';
import cartItemsFixture from '../reducers/fixtures/cartItemsFixture';

export default function getCartItems() {
  return {
    type: 'GET_CART_ITEMS'
  };
}
