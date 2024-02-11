import {
  ordersConnect,
  ordersDisconnect,
  ordersWsOpen,
  ordersWsClose,
  ordersWsMessage,
  ordersWsError,
  ordersWsConnecting,
} from "../orders/actions";
import {socketMiddleware} from "./socket-middleware";

export const OrdersMiddleware = socketMiddleware({
  wsConnect: ordersConnect,
  wsDisconnect: ordersDisconnect,
  wsConnecting: ordersWsConnecting,
  onOpen: ordersWsOpen,
  onError: ordersWsError,
  onClose: ordersWsClose,
  onMessage: ordersWsMessage,
});