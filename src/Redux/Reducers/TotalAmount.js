import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  Amount: 0,
};

const TotalAmountSlice = createSlice({
  name: 'totalAmount',
  initialState,
  reducers: {
    addTotalAmount: (state, action) => {
      return {
        Amount: action.payload.Amount,
      };
    },
    clearAmount: (state, action) => {
      return {
        Amount: 0,
      };
    },
  },
});

export const {addTotalAmount} = TotalAmountSlice.actions;
export default TotalAmountSlice.reducer;
