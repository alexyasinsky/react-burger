import {createSlice} from "@reduxjs/toolkit";
import {TOrder} from "../../../utils/types";
import {
  feedOrdersWsClose,
  feedOrdersWsConnecting,
  feedOrdersWsError,
  feedOrdersWsMessage,
  feedOrdersWsOpen
} from "./actions";

type TInitialState = {
  status: string;
  orders: Array<TOrder>;
  connectionError: string;
}

const initialState: TInitialState = {
  status: 'OFFLINE',
  orders: [],
  connectionError: ""
}

const feedOrdersSlice = createSlice({
  name: 'feedOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(feedOrdersWsConnecting, state => {
      console.log("Connecting");
      state.status = 'WebsocketStatus.CONNECTING';
    })
      .addCase(feedOrdersWsOpen, state => {
        state.status = 'WebsocketStatus.ONLINE';
      })
      .addCase(feedOrdersWsClose, state => {
        state.status = 'WebsocketStatus.OFFLINE';
      })
      .addCase(feedOrdersWsError, (state, action) => {
        state.connectionError = action.payload;
      })
      .addCase(feedOrdersWsMessage, (state, action) => {
        state.orders = action.payload.orders;
      })
  },
  selectors: {
    selectFeedOrders: state => state.orders,
  }
})

const {selectors, reducer} = feedOrdersSlice;

export const {selectFeedOrders} = selectors;

export default reducer;