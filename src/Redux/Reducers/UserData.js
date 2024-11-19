import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  id: null,
  users_name: '',
  users_email: '',
  users_mob: null,
};

const UserDataSlice = createSlice({
  name: 'UserData',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.users_name = action.payload.users_name;
      state.users_email = action.payload.users_name;
      state.users_mob = action.payload.users_mob;
    },
    updateProfile: (state, action) => {
      state.users_name = action.payload.users_name || state.users_name;
      state.users_email = action.payload.users_name || state.users_email;
      state.users_mob = action.payload.users_mob || state.users_mob;
    },
  },
});

export const {setProfile, updateProfile} = UserDataSlice.actions;
export default UserDataSlice.reducer;
