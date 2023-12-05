import { createAsyncThunk } from '@reduxjs/toolkit';

const url = 'https://norma.nomoreparties.space/api/ingredients';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const response = await fetch(url);
    return response.json();
  }
)