import { configureStore } from '@reduxjs/toolkit';
import ingredientsSlice from './ingredients/reducers';


export const store = configureStore({
  reducer: {ingredientsSlice}
}) 