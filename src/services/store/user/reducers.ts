import {createSlice} from "@reduxjs/toolkit";
import {register, login, logout, getUser, editUser} from "./actions";
import {TUser} from "../../../utils/types";

type TInitialState = {
  user: TUser | null;
  isAuthChecked: boolean;
}

const initialState: TInitialState = {
  user: null,
  isAuthChecked: false,
};

const userSlice = createSlice({
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
        state.user = action.payload.user;
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

type TUserActionCreators = typeof userSlice.actions;

export type TUserActions = ReturnType<TUserActionCreators[keyof TUserActionCreators]>;