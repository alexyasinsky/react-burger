import { createAsyncThunk } from '@reduxjs/toolkit';
import {burgerApi, makeRequest} from "../../../utils/api";
export const fetchIngredients = createAsyncThunk(
  'burger-ingredients/fetchIngredients',
  async () => makeRequest(`${burgerApi}/ingredients`)
)
