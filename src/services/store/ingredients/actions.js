import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const response = await fetch('https://norma.nomoreparties.space/api/ingredients');
    return response.json();
  }
)

export const makeOrder = createAsyncThunk(
  'ingredients/postOrder',
  async (ingredientsIds) => {
    const response = await fetch('https://norma.nomoreparties.space/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        "ingredients": ingredientsIds
      })
    });
    return response.json();
  }
)