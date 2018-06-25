import { push } from 'connected-react-router';
import lpItemsFixture from '../reducers/fixtures/lpItemsFixture';
import cartItemsFixture from '../reducers/fixtures/cartItemsFixture';
import updateCartItems from './updateCartItems';

export default function removeItemFromCart(id) {
  return (dispatch, getState) => {
    /**
     * This logic is written instead of doing API-call.
     * Actual Logic should be doing API-call with ID, & then it will return Fresh-CartItems-List.
     */
    let cartItems = [...getState().cartItems];
    let cartItemIndex = cartItems.findIndex(item => item.id === id);
    let item;

    if (cartItemIndex !== -1) {
      cartItems.splice(cartItemIndex, 1);
    } else {
      return;
    }

    if (!cartItems.length) dispatch(push('/'));
    dispatch(updateCartItems(cartItems));
  };
}
