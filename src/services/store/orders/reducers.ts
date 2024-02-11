import { createReducer } from "@reduxjs/toolkit";

import {ordersWsClose, ordersWsConnecting, ordersWsError, ordersWsMessage, ordersWsOpen} from "./actions";

export type TLiveTableStore = {
  status: string;
  data: object;
  connectionError: string;
}

const initialState: TLiveTableStore = {
  status: 'OFFLINE',
  data: {},
  connectionError: ""
};
export const orders = createReducer(initialState, (builder) => {
  builder
    .addCase(ordersWsConnecting, state => {
      console.log("Connecting");
      state.status = 'WebsocketStatus.CONNECTING';
    })
    .addCase(ordersWsOpen, state => {
      state.status = 'WebsocketStatus.ONLINE';
    })
    .addCase(ordersWsClose, state => {
      state.status = 'WebsocketStatus.OFFLINE';
    })
    .addCase(ordersWsError, (state, action) => {
      state.connectionError = action.payload;
    })
    .addCase(ordersWsMessage, (state, action) => {
      state.data = action.payload;
    })
});