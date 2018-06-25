import lpItemsFixture from '../reducers/fixtures/lpItemsFixture';
import cartItemsFixture from '../reducers/fixtures/cartItemsFixture';

import storage from '../helpers/StorageHelper';

export default function updateCartItems(cartItems) {
  storage.set('cartItems', cartItems);
  return {
    type: 'UPDATE_CART_ITEMS',
    cartItems
  };
}
