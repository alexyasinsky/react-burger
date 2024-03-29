import {TOrder} from "../../utils/types";
import {JSX} from "react";
import OrderCard from "../order-card/order-card";
import styles from "./order-list.module.scss";

type TProps = {
  orders: Array<TOrder>
  size: 'medium' | 'large',
}
export default function OrderList ({orders, size}: TProps): JSX.Element {
  return (
    <div className={`${styles.list} custom-scroll`}>
      {
        orders && orders.map((order) => {
          return (
            <OrderCard order={order} size={size} key={order._id} view="list"/>
          )
        })
      }
    </div>
  )
}