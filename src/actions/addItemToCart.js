import lpItemsFixture from '../reducers/fixtures/lpItemsFixture';
import cartItemsFixture from '../reducers/fixtures/cartItemsFixture';
import updateCartItems from './updateCartItems';

export default function addItemToCart(id) {
  return (dispatch, getState) => {
    /**
     * This logic is written instead of doing API-call.
     * Actual Logic should be doing API-call with ID, & then it will return Fresh-CartItems-List.
     */
    let cartItems = [...getState().cartItems];
    let lpItems = [...lpItemsFixture];
    let cartItemIndex = cartItems.findIndex(item => item.id === id);
    let lpItemIndex = lpItems.findIndex(item => item.id === id);
    let item;

    if (cartItemIndex !== -1) {
      item = Object.assign({}, cartItems[cartItemIndex]);
      item.quantity = (item.quantity || 0) + 1;
      cartItems.splice(cartItemIndex, 1, item);
    } else if (lpItemIndex !== -1) {
      item = Object.assign({}, lpItems[lpItemIndex]);
      item.quantity = (item.quantity || 0) + 1;
      cartItems.push(item);
    } else {
      return;
    }

    dispatch(updateCartItems(cartItems));
  };
}
