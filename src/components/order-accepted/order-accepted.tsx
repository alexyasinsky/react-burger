import styles from './order-accepted.module.scss';
import { useSelector } from 'react-redux';
import { selectOrderNumber } from '../../services/store/order/reducers';
import {JSX} from "react";

export default function OrderAccepted(): JSX.Element {

  const number = useSelector(selectOrderNumber);
  
  return (
    <div className={styles.wrapper}>
      <p className={`${styles.number} text text_type_digits-large mb-8 mt-10`}>{number}</p>
      <p className="text text_type_main-medium">
        идентификатор заказа
      </p>
      <div className={`${styles.done} m-15`}></div>
      <p className="text text_type_main-small mb-2">
        Ваш заказ уже начали готовить
      </p>
      <p className="text text_type_main-small text_color_inactive mb-20">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}