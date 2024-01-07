import {createSlice} from "@reduxjs/toolkit";
import {register, login, logout, getUser, editUser} from "./actions";

const initialState = {
  user: null,
  isAuthChecked: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    }
  },
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
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.user = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
  },
  selectors: {
    selectUser: state => state.user,
    selectIsAuthChecked: state => state.isAuthChecked
  }
});

const { actions,selectors, reducer } = userSlice;
export const { setAuthChecked } = actions;
export const { selectUser, selectIsAuthChecked} = selectors;

export default reducer;