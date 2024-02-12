import {JSX, useEffect} from "react";
import {BURGER_WS_API} from "../../utils/api";
import {useAppDispatch, useAppSelector} from "../../services/store/hooks";
import {profileOrdersConnect, profileOrdersDisconnect} from "../../services/store/profile-orders/actions";
import {selectProfileOrders} from "../../services/store/profile-orders/reducers";
import OrderList from "../order-list/order-list";
import styles from './profile-order-history.module.scss';

export default function ProfileOrderHistory(): JSX.Element {

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(profileOrdersConnect(`${BURGER_WS_API}?token=${localStorage.getItem('accessToken')!.replace("Bearer ", "")}`));
    return () => {
      dispatch(profileOrdersDisconnect());
    }
  }, [dispatch]);

  const orders = useAppSelector(selectProfileOrders);

 return (
   <section className={styles.wrapper}>
     <OrderList orders={orders} size='large'/>
   </section>

 )
}