import {createAsyncThunk} from "@reduxjs/toolkit";
import {makeRequest, BURGER_API} from "../../../utils/api";
import {TOrder} from "../../../utils/types";

type TOrderFromApi = {
  order: TOrder;
}
export const makeOrder = createAsyncThunk(
  'burger-ingredients/makeOrder',
  async (ingredientsIds: Array<string>) => makeRequest<TOrderFromApi>(`${BURGER_API}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken') || ''
    },
    body: JSON.stringify({
      "ingredients": ingredientsIds
    })
  })
)