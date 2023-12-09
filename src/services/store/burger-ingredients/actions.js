import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchIngredients = createAsyncThunk(
  'burger-ingredients/fetchIngredients',
  async () => {
    const response = await fetch('https://norma.nomoreparties.space/api/ingredients');
    return response.json();
  }
)
