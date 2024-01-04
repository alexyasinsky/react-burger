import {createSlice} from "@reduxjs/toolkit";
import {register, login, logout, getUser, editUser} from "./actions";

const initialState = {
  user: null,
  isAuthChecked: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
  },
  selectors: {
    selectUser: state => state.user
  }
});

const { selectors, reducer } = userSlice;

export const { selectUser} = selectors;

export default reducer;