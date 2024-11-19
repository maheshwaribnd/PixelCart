import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

const ProductList = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    ProductListingFunction: (state, action) => {
      state.products.push({
        id: action.payload.product_id,
        quantity: action.payload.quantity || 1
        // price: action.payload.price,
      });
    },
  },
});

export const {ProductListingFunction} = ProductList.actions;
export default ProductList.reducer;
