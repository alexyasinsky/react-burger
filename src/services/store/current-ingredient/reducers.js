import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ingredient: null,
}

const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState: initialState,
  reducers: {
    setCurrentIngredient: (state, action) => {
      state.ingredient = action.payload;
    },
  },

})

const { actions, reducer } = currentIngredientSlice;

export const { setCurrentIngredient } = actions;

export default reducer;