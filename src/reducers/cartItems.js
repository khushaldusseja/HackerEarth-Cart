import storage from '../helpers/StorageHelper';
const initialState = storage.get('cartItems') || [];

export default function getCartItems(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_CART_ITEMS':
      return Object.assign([], action.cartItems);
    case 'GET_CART_ITEMS':
    default:
      return state;
  }
}
