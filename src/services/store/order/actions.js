import {createAsyncThunk} from "@reduxjs/toolkit";

const url = 'https://norma.nomoreparties.space/api/orders';
export const makeOrder = createAsyncThunk(
  'burger-ingredients/postOrder',
  async (ingredientsIds) => {
    const response = await fetch(url, {
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