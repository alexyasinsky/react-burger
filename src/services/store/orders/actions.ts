import { createAction } from "@reduxjs/toolkit";

export const ordersConnect = createAction<string, 'ORDERS_CONNECT'>('ORDERS_CONNECT');
export const ordersDisconnect = createAction("ORDERS_DISCONNECT");

export const ordersWsConnecting = createAction("ORDERS_WS_CONNECTING");
export const ordersWsOpen = createAction("ORDERS_WS_OPEN");
export const ordersWsClose = createAction("ORDERS_WS_CLOSE");
export const ordersWsError = createAction<string, "ORDERS_WS_ERROR">("ORDERS_WS_ERROR");
export const ordersWsMessage = createAction<object, "ORDERS_WS_MESSAGE">("ORDERS_WS_MESSAGE");

export type TOrdersActions = ReturnType<typeof ordersConnect>
  | ReturnType<typeof ordersDisconnect>
  | ReturnType<typeof ordersWsConnecting>
  | ReturnType<typeof ordersWsError>
  | ReturnType<typeof ordersWsOpen>
  | ReturnType<typeof ordersWsClose>
  | ReturnType<typeof ordersWsMessage>;

