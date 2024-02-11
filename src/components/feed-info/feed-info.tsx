import styles from "../../pages/feed/feed.module.scss";
import {useAppSelector} from "../../services/store/hooks";
import {selectFeedOrders, selectTotal, selectTotalToday} from "../../services/store/feed-orders/reducers";
import {JSX, useMemo} from "react";
// @ts-ignore
import {v4 as uuid} from "uuid";


export default function FeedInfo(): JSX.Element {

  const orders = useAppSelector(selectFeedOrders);
  const total = useAppSelector(selectTotal);
  const totalToday = useAppSelector(selectTotalToday);

  const doneOrders = useMemo(() => orders.map((order, ind) => {
    if (order.status === 'done' && ind <= 19) {
      return order.number;
    }
  }), [orders]);
  const pendingOrders = useMemo(() => orders.map((order, ind) => {
    if (order.status === 'pending' && ind <= 19) {
      return order.number;
    }
  }), [orders]);

  return (
    <section className={`${styles.info} ml-10`}>
      <div className={`${styles.ordersStatus}`}>
        <div>
          <h3 className="text text_type_main-medium mb-5">
            Готовы:
          </h3>
          <div className={styles.ordersList}>
            {
              doneOrders.map(order => (
                <div key={uuid()}>
                  <p className={`text text_type_digits-default mb-2 ${styles.done}`}>
                    {order}
                  </p>
                </div>
              ))
            }
          </div>
        </div>
        <div>
          <h3 className="text text_type_main-medium mb-5">
            В работе:
          </h3>
          <div className={styles.ordersList}>
            {
              pendingOrders.map(order => (
                <div key={uuid()}>
                  <p className="text text_type_digits-default mb-2">
                    {order}
                  </p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className="mt-10 mb-10">
        <h3 className="text text_type_main-medium mb-8">
          Выполнено за все время:
        </h3>
        <p className="text text_type_digits-large">{total}</p>
      </div>
      <div>
        <h3 className="text text_type_main-medium mb-8">
          Выполнено за сегодня:
        </h3>
        <p className="text text_type_digits-large">{totalToday}</p>
      </div>
    </section>
  )
}