import { createAsyncThunk } from '@reduxjs/toolkit';
import {url, makeRequest} from "../../../utils/api";
export const fetchIngredients = createAsyncThunk(
  'burger-ingredients/fetchIngredients',
  async () => makeRequest(`${url}/ingredients`)
)
