import {configureStore} from '@reduxjs/toolkit';
import Cart from '../Reducers/Cart';
import addAddress from '../Reducers/Address';
import ProductListingFunction from '../Reducers/ProductList';
import addTotalAmount from '../Reducers/TotalAmount';
import UserDetails from '../Reducers/UserData';

const store = configureStore({
  reducer: {
    Cart,
    addAddress,
    ProductListingFunction,
    addTotalAmount,
    UserDetails,
  },
});

export default store;
