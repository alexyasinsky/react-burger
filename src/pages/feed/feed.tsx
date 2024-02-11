import {JSX, useEffect} from "react";
import {BURGER_WS_API} from "../../utils/api";
import {useAppDispatch, useAppSelector} from "../../services/store/hooks";
import {feedOrdersConnect} from "../../services/store/feed-orders/actions";
import {selectFeedOrders} from "../../services/store/feed-orders/reducers";


export default function Feed(): JSX.Element {

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(feedOrdersConnect(`${BURGER_WS_API}/all`));
  }, []);


  const orders = useAppSelector(selectFeedOrders);
  console.log(orders);

  return (
    <>
    </>
  )
}