import styles from './burger-constructor-total.module.scss';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import Modal from '../../modal/modal';
import OrderDetails from '../../order-details/order-details';

export default function BurgerConstructorTotal({sum}) {

  const [visibilityOfOrderDetails, setVisibilityIfOrderDetails] = useState(false);

  function toggelVisibilityOfOrderDetails() {
    setVisibilityIfOrderDetails(!visibilityOfOrderDetails);
  }

  return (
    <>
      <div className={`${styles.total} mt-10 pr-4`}>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">{sum}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={toggelVisibilityOfOrderDetails}
          htmlType="button"
          type="primary"
          size="large"
          extraClass="ml-10"
        >
          Оформить заказ
        </Button>
      </div>
      {visibilityOfOrderDetails && (
        <Modal onClose={toggelVisibilityOfOrderDetails}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}
