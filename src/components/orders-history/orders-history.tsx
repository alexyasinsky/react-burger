import {JSX, useEffect} from "react";
import {BURGER_WS_API} from "../../utils/api";
import {useAppDispatch, useAppSelector} from "../../services/store/hooks";
import {profileOrdersConnect} from "../../services/store/profile-orders/actions";
import {selectProfileOrders} from "../../services/store/profile-orders/reducers";


export default function OrdersHistory(): JSX.Element {

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(profileOrdersConnect(`${BURGER_WS_API}?token=${localStorage.getItem('accessToken')!.replace("Bearer ", "")}`));
  }, []);

  const orders = useAppSelector(selectProfileOrders);

  console.log(orders);


 return (
   <>

   </>
 )
}