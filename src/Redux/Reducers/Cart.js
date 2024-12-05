import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

const Cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      let Index = -1;
      state.map((item, index) => {
        if (item.id == action.payload.id) {
          Index = index;
        }
      });
      if (Index == -1) {
        state.push({
          name: action.payload.name,
          id: action.payload.id,
          image_name: action.payload.image_name,
          price: action.payload.price,
          qty: action.payload.qty + 1,
          // oldPrice: action.payload.oldPrice,
          // Percent_off: action.payload.Percent_off,
        });
      } else {
        state[Index].qty = state[Index].qty + 1;
      }
    },
    removeToCart(state, action) {
      let Index = -1;
      state.map((item, index) => {
        if (item.id == action.payload.id) {
          Index = index;
        }
      });
      if (Index == -1) {
      } else {
        state[Index].qty = state[Index].qty - 1;
      }
    },
    deleteToCart(state, action) {
      return (state = state.filter(item => item.id !== action.payload));
    },

    clearCart(state) {
      return [];
    },
  },
});

export const {addToCart, removeToCart, deleteToCart, clearCart} = Cart.actions;
export default Cart.reducer;
