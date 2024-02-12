import {JSX, useEffect, useMemo} from "react";
import {BURGER_WS_API} from "../../utils/api";
import {useAppDispatch, useAppSelector} from "../../services/store/hooks";
import {feedOrdersConnect, feedOrdersDisconnect} from "../../services/store/feed-orders/actions";
import styles from './feed.module.scss';
import {selectFeedOrders, selectTotal, selectTotalToday} from "../../services/store/feed-orders/reducers";
import OrderList from "../../components/order-list/order-list";
import uuid from "../../utils/uuid";

export default function Feed(): JSX.Element {

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(feedOrdersConnect(`${BURGER_WS_API}/all`));
    return () => {
      dispatch(feedOrdersDisconnect());
    }
  }, []);

  const orders = useAppSelector(selectFeedOrders);
  const total = useAppSelector(selectTotal);
  const totalToday = useAppSelector(selectTotalToday);

  const doneOrders = useMemo(() => orders.map((order, ind) => {
    if (order.status === 'done' && ind <= 9) {
      return order.number;
    }
  }), [orders]);
  const pendingOrders = useMemo(() => orders.map((order, ind) => {
    if (order.status === 'pending' && ind <= 9) {
      return order.number;
    }
  }), [orders]);

  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_main-large pb-5">Лента заказов</h1>
      <div className={styles.dashboard}>
        <section>
          <OrderList orders={orders} size="medium"/>
        </section>
        <section className='ml-10'>
          <div className={`${styles.status}`}>
            <div>
              <h3 className="text text_type_main-medium mb-5">
                Готовы:
              </h3>
              <div className={styles.list}>
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
      </div>
    </div>

  )
}