import { createSlice } from '@reduxjs/toolkit';
import { fetchIngredients } from './actions';


const initialState = {
 ingredientsList: [],
 cart: [],
 currentIngredient: {},
 order: null
}

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialState,
  reducers: {
    test: (state) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.ingredientsList = [...action.payload.data];
    })
  },
}) 

const { actions, reducer } = ingredientsSlice;

export const { log } = actions;

export default reducer;