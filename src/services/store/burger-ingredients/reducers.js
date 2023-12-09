import { createSlice } from '@reduxjs/toolkit';
import { fetchIngredients } from './actions';

const initialState = {
  loading: false,
  error: false,
  ingredients: [],
}

const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState: initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.loading = false;
      state.ingredients = [...action.payload.data];
    })
    builder.addCase(fetchIngredients.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    })
  },

}) 

const { reducer } = burgerIngredientsSlice;

export default reducer;