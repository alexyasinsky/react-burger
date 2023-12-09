import {createAsyncThunk} from "@reduxjs/toolkit";

export const makeOrder = createAsyncThunk(
  'burger-ingredients/postOrder',
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