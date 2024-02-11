import {JSX, useEffect} from "react";
import {BURGER_WS_API} from "../../utils/api";
import {useAppDispatch} from "../../services/store/hooks";
import {feedOrdersConnect} from "../../services/store/feed-orders/actions";
import styles from './feed.module.scss';
import OrdersFeedList from "../../components/feed-orders-list/orders-feed-list";
import FeedInfo from "../../components/feed-info/feed-info";

export default function Feed(): JSX.Element {

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(feedOrdersConnect(`${BURGER_WS_API}/all`));
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_main-large pb-5">Лента заказов</h1>
      <div className={styles.dashboard}>
        <OrdersFeedList/>
        <FeedInfo/>
      </div>
    </div>

  )
}