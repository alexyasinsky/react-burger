import { createSlice } from '@reduxjs/toolkit';
import { fetchIngredients } from './actions';


const initialState = {
 ingredients: [],
}

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialState,
  reducers: {
    test: (state) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.ingredients = [...action.payload.data];
    })
  },
}) 

const { actions, reducer } = ingredientsSlice;

export const { log } = actions;

export default reducer;