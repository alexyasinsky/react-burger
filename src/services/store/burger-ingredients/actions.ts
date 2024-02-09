import { createAsyncThunk } from '@reduxjs/toolkit';
import {BURGER_API, makeRequest} from "../../../utils/api";
import {TIngredient} from "../../../utils/types";

type TIngredientsFromApi = {
  data: Array<TIngredient>
}

export const fetchIngredients = createAsyncThunk(
  'burger-ingredients/fetchIngredients',
  async () => makeRequest<TIngredientsFromApi>(`${BURGER_API}/ingredients`)
)
