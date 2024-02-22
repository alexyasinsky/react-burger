import { createAsyncThunk } from '@reduxjs/toolkit';
import {makeRequest} from "../../../utils/api";
import {TIngredient} from "../../../utils/types";
import {BURGER_API} from "../../../utils/constants";

type TIngredientsFromApi = {
  data: Array<TIngredient>
}

export const fetchIngredients = createAsyncThunk(
  'burger-ingredients/fetchIngredients',
  async () => makeRequest<TIngredientsFromApi>(`${BURGER_API}/ingredients`)
)
