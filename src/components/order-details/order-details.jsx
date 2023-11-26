import styles from './order-details.module.scss';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function OrderDetails() {

  const orderNumber = Math.floor(Math.random() * 1000000);

  return (
    <div className={styles.wrapper}>
      <p className={`${styles.number} text text_type_digits-large mb-8 mt-10`}>{orderNumber}</p>
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