import {createAsyncThunk} from "@reduxjs/toolkit";
import {makeRequest, burgerApi} from "../../../utils/api";
export const makeOrder = createAsyncThunk(
  'burger-ingredients/postOrder',
  async (ingredientsIds) => makeRequest(`${burgerApi}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        "ingredients": ingredientsIds
      })
    })
)