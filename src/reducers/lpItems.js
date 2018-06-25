const initialState = [];

export default function getLPItems(state = initialState, action) {
  switch (action.type) {
    case 'GET_LP_ITEMS':
      return Object.assign([], state, action.lpItems);
    default:
      return state;
  }
}
