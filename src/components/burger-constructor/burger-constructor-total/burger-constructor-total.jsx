import styles from './burger-constructor-total.module.scss';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from '../../modal/modal';
import OrderDetails from '../../order-details/order-details';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import { clearOrder, selectOrderNumber  } from '../../../services/store/order/reducers';
import {useCallback, useMemo} from 'react';
import {selectBun, selectFilling} from "../../../services/store/burger-constructor/reducers";
import {makeOrder} from "../../../services/store/order/actions";

export default function BurgerConstructorTotal() {

  const bun = useSelector(selectBun);
  const filling = useSelector(selectFilling);

  const dispatch = useDispatch();

  const orderButtonHandler = useCallback(()=> {
    const ingredients = [bun, ...filling, bun];
    const ids = ingredients.map(item => item._id);
    dispatch(makeOrder(ids));
  }, [dispatch, filling])

  const orderNumber = useSelector(selectOrderNumber);

  const totalSum = useMemo(
    () => {
      let result = 0;
      bun && (result += bun.price * 2);
      filling.length !== 0 && (result += filling.reduce((acc, item) => acc + item.price, 0));
      return result;
    }, [bun, filling]);

  const closeOrderModal = useCallback(() => {
      dispatch(clearOrder())
    }, [dispatch],
  )

  return (
    <>
      <div className={`${styles.total} mt-10 pr-4`}>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">{totalSum}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={orderButtonHandler}
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
