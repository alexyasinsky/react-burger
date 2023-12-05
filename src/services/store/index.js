import { configureStore } from '@reduxjs/toolkit';
import ingredients from './ingredients/reducers';


export const store = configureStore({
  reducer: {ingredients}
}) 