import {JSX, useMemo} from "react";
import {TOrder} from "../../utils/types";
import moment from "moment";
import 'moment/locale/ru';
import OrderListItem from "../order-list/order-list-item-view/order-list-item-view";

import OrderDetailsView from "../order-details/order-details-view/order-details-view";

type TProps = {
  order: TOrder;
  size?: 'medium' | 'large';
  view: 'details' | 'list';
}
export default function OrderCard({order, size, view}: TProps): JSX.Element {

  const translatedStatus = {
    created: 'Создан',
    cancelled: 'Отменен',
    pending: 'Готовится',
    done: 'Выполнен',
  }

  const number = useMemo(() => {
    let orderStr = String(order.number);
    for (let i = orderStr.length; i < 6; i++) {
      orderStr = '0' + orderStr;
    }
    return `#${orderStr}`
  }, [order])

  const time = useMemo(() => {
    return moment(order.updatedAt).locale('ru').calendar();
  }, [order])

  return (
    <>
      {view === 'list' && (
        <OrderListItem
          order={order}
          number={number}
          size={size}
          translatedStatus={translatedStatus[order.status]}
          time={time}/>
      )
      }
      {view === 'details' && (
        <OrderDetailsView
          order={order}
          number={number}
          translatedStatus={translatedStatus[order.status]}
          time={time}/>
      )
      }
    </>
  )
}