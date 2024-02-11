import {JSX, useEffect} from "react";
import {BURGER_WS_API} from "../../utils/api";
import {useAppDispatch, useAppSelector} from "../../services/store/hooks";
import {feedOrdersConnect} from "../../services/store/feed-orders/actions";
import {selectFeedOrders} from "../../services/store/feed-orders/reducers";
import styles from './feed.module.scss';
import OrderCard from "../../components/order-card/order-card";

export default function Feed(): JSX.Element {

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(feedOrdersConnect(`${BURGER_WS_API}/all`));
  }, []);


  const orders = useAppSelector(selectFeedOrders);
  console.log(orders);

  return (
    <div>
      <h1 className="text text_type_main-large pb-5">Лента заказов</h1>
      <div className={styles.wrapper}>
        <section className={`${styles.feed} custom-scroll`}>
          {
            orders.map((order, ind) => {
              return (
                <OrderCard order={order} key={ind}/>
              )
            })
          }
        </section>
        <section className={styles.info}>
          Инфо
        </section>
      </div>
    </div>

  )
}