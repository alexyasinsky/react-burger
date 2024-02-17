import {JSX} from "react";
import {TOrder} from "../../utils/types";
import OrderListItem from "../order-list/order-list-item-view/order-list-item-view";

import OrderDetailsView from "../order-details/order-details-view/order-details-view";
import { TRANSLATED_STATUS } from '../../utils/constants';

type TProps = {
  order: TOrder;
  size?: 'medium' | 'large';
  view: 'details' | 'list';
}
export default function OrderCard({order, size, view}: TProps): JSX.Element {

  const number = () => {
    let orderStr = String(order.number);
    for (let i = orderStr.length; i < 6; i++) {
      orderStr = '0' + orderStr;
    }
    return `#${orderStr}`
  }


  return (
    <>
      {view === 'list' && (
        <OrderListItem
          order={order}
          number={number()}
          size={size}
          translatedStatus={TRANSLATED_STATUS[order.status]}
          />
      )
      }
      {view === 'details' && (
        <OrderDetailsView
          order={order}
          number={number()}
          translatedStatus={TRANSLATED_STATUS[order.status]}
          />
      )
      }
    </>
  )
}