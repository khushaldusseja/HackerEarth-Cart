import lpItemsFixture from '../reducers/fixtures/lpItemsFixture';
import cartItemsFixture from '../reducers/fixtures/cartItemsFixture';
import updateCartItems from './updateCartItems';

export default function updateQuantityOfCartItem(id, quantity) {
  return (dispatch, getState) => {
    /**
     * This logic is written instead of doing API-call.
     * Actual Logic should be doing API-call with ID & Quantity, & then it will return Fresh-CartItems-List.
     */
    let cartItems = [...getState().cartItems];
    let cartItemIndex = cartItems.findIndex(item => item.id === id);
    let item;

    if (cartItemIndex !== -1) {
      item = Object.assign({}, cartItems[cartItemIndex]);
      item.quantity = quantity;
      cartItems.splice(cartItemIndex, 1, item);
    } else {
      return;
    }

    dispatch(updateCartItems(cartItems));
  };
}
