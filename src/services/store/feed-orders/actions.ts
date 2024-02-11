import { createAction } from "@reduxjs/toolkit";
import {socketMiddleware} from "../middleware/socket-middleware";
import {TOrder} from "../../../utils/types";

type TPayload = {
  success: boolean,
  orders: Array<TOrder>
}
export const feedOrdersConnect = createAction<string, 'FEED_ORDERS_CONNECT'>('FEED_ORDERS_CONNECT');
export const feedOrdersDisconnect = createAction("FEED_ORDERS_DISCONNECT");

export const feedOrdersWsConnecting = createAction("FEED_ORDERS_WS_CONNECTING");
export const feedOrdersWsOpen = createAction("FEED_ORDERS_WS_OPEN");
export const feedOrdersWsClose = createAction("FEED_ORDERS_WS_CLOSE");
export const feedOrdersWsError = createAction<string, "FEED_ORDERS_WS_ERROR">("FEED_ORDERS_WS_ERROR");
export const feedOrdersWsMessage = createAction<TPayload, "FEED_ORDERS_WS_MESSAGE">("FEED_ORDERS_WS_MESSAGE");

export type TFeedOrdersActions = ReturnType<typeof feedOrdersConnect>
  | ReturnType<typeof feedOrdersDisconnect>
  | ReturnType<typeof feedOrdersWsConnecting>
  | ReturnType<typeof feedOrdersWsError>
  | ReturnType<typeof feedOrdersWsOpen>
  | ReturnType<typeof feedOrdersWsClose>
  | ReturnType<typeof feedOrdersWsMessage>;

export const feedOrdersMiddleware = socketMiddleware({
  wsConnect: feedOrdersConnect,
  wsDisconnect: feedOrdersDisconnect,
  wsConnecting: feedOrdersWsConnecting,
  onOpen: feedOrdersWsOpen,
  onError: feedOrdersWsError,
  onClose: feedOrdersWsClose,
  onMessage: feedOrdersWsMessage,
});