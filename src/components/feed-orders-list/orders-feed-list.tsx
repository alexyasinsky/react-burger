import {useAppSelector} from "../../services/store/hooks";
import {selectFeedOrders} from "../../services/store/feed-orders/reducers";
import {JSX} from "react";
import styles from "../../pages/feed/feed.module.scss";
import OrderCard from "../order-card/order-card";
// @ts-ignore
import {v4 as uuid} from "uuid";

export default function OrdersFeedList(): JSX.Element {

  const orders = useAppSelector(selectFeedOrders);

  return (
    <section className={`${styles.feed} custom-scroll`}>
      {
        orders.map((order) => {
          return (
            <OrderCard order={order} key={uuid()}/>
          )
        })
      }
    </section>
  )
}