import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  name: '',
  address: '',
  phone: '',
  pincode: '',
  type: '',
};

const AddressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    addAddress: (state, action) => {
      return {
        name: action.payload.name,
        address: action.payload.address,
        phone: action.payload.phone,
        pincode: action.payload.pincode,
        type: action.payload.type,
        // city: action.payload.city,
        //   state: action.payload.state,
      };
    },
  },
});

export const {addAddress, removeAddress} = AddressSlice.actions;
export default AddressSlice.reducer;
