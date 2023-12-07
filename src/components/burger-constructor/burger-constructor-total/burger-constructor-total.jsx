import styles from './burger-constructor-total.module.scss';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from '../../modal/modal';
import OrderDetails from '../../order-details/order-details';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import { selectOrderNumber } from '../../../services/store/ingredients/selectors';
import { clearOrder } from '../../../services/store/ingredients/reducers';
import { useCallback } from 'react';

export default function BurgerConstructorTotal({makeOrder, sum = 0}) {

  const orderNumber = useSelector(selectOrderNumber);

  const dispatch = useDispatch();
  
  const closeOrderModal = useCallback(() => {
      dispatch(clearOrder())
    }, [dispatch],
  )
  

  return (
    <>
      <div className={`${styles.total} mt-10 pr-4`}>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">{sum}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={makeOrder}
          htmlType="button"
          type="primary"
          size="large"
          extraClass="ml-10" 
        >
          Оформить заказ
        </Button>
      </div>
      {orderNumber && (
        <Modal onClose={closeOrderModal}>
          <OrderDetails/>
        </Modal>
      )}
    </>
  );
}

BurgerConstructorTotal.propTypes = {
  sum : PropTypes.number
}
