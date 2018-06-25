import lpItemsFixture from '../reducers/fixtures/lpItemsFixture';

export default function getLPItems() {
  return {
    type: 'GET_LP_ITEMS',
    lpItems: lpItemsFixture
  };
}
