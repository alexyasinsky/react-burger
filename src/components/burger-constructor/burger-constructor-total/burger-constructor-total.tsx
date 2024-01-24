import styles from './burger-constructor-total.module.scss';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from '../../modal/modal';
import OrderAccepted from '../../order-accepted/order-accepted';
import { useDispatch, useSelector } from 'react-redux';
import { clearOrder, selectOrderNumber  } from '../../../services/store/order/reducers';
import {JSX, useCallback, useMemo} from 'react';
import {clearConstructorState, selectBun, selectFillings} from "../../../services/store/burger-constructor/reducers";
import {makeOrder} from "../../../services/store/order/actions";
import {selectUser} from "../../../services/store/user/reducers";
import {useNavigate} from "react-router-dom";
import {TIngredient} from "../../../utils/types";

export default function BurgerConstructorTotal() : JSX.Element {

  const bun: TIngredient | null = useSelector(selectBun);
  const fillings: Array<TIngredient> = useSelector(selectFillings);

  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const orderButtonHandler = useCallback((): void => {
    if (!user) return navigate('/login');
    if (bun === null || fillings.length === 0) return
    const ingredients = [bun, ...fillings, bun];
    const ids = ingredients.map(item => item._id);
    //@ts-ignore
    dispatch(makeOrder(ids));
  }, [dispatch, bun, fillings, navigate, user])

  const orderNumber = useSelector(selectOrderNumber);

  const totalSum = useMemo(
    () => {
      let result: number  = 0;
      bun && (result += +bun['price'] * 2);
      fillings.length !== 0 && (result = result + fillings.reduce((acc: number, item: TIngredient): number => acc + +item.price, 0));
      return result;
    }, [bun, fillings]);

  const closeOrderModal = useCallback(() => {
      dispatch(clearOrder());
      dispatch(clearConstructorState())
    }, [dispatch]
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
          <OrderAccepted/>
        </Modal>
      )}
    </>
  );
}
