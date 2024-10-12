import {configureStore} from '@reduxjs/toolkit';
import Cart from '../Reducers/Cart';
import addAddress from '../Reducers/Address';
import ProductListingFunction from '../Reducers/ProductList';
import addTotalAmount from '../Reducers/TotalAmount';

const store = configureStore({
  reducer: {
    Cart,
    addAddress,
    ProductListingFunction,
    addTotalAmount,
  },
});

export default store;
