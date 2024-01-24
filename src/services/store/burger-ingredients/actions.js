import { createAsyncThunk } from '@reduxjs/toolkit';
import {BURGER_API, makeRequest} from "../../../utils/api";
export const fetchIngredients = createAsyncThunk(
  'burger-ingredients/fetchIngredients',
  async () => makeRequest(`${BURGER_API}/ingredients`)
)
