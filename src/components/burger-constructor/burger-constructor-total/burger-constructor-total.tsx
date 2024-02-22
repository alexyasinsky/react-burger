import styles from './burger-constructor-total.module.scss';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from '../../modal/modal';
import OrderAccepted from '../../order-accepted/order-accepted';
import { clearOrder, selectOrderNumber  } from '../../../services/store/order/reducers';
import {JSX, useCallback, useEffect, useMemo, useState} from 'react';
import {clearConstructorState, selectBun, selectFillings} from "../../../services/store/burger-constructor/reducers";
import {makeOrder} from "../../../services/store/order/actions";
import {selectUser} from "../../../services/store/user/reducers";
import {useNavigate} from "react-router-dom";
import {TIngredient} from "../../../utils/types";
import Loader from "../../loader/loader";
import {useAppDispatch, useAppSelector} from "../../../services/store/hooks";

export default function BurgerConstructorTotal() : JSX.Element {

  const bun: TIngredient | null = useAppSelector(selectBun);
  const fillings: Array<TIngredient> = useAppSelector(selectFillings);

  const user = useAppSelector(selectUser);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [isLoaderVisible, setIsLoaderVisible] = useState(false);

  const orderButtonHandler = useCallback((): void => {
    if (!user) return navigate('/login');
    if (bun === null || fillings.length === 0) return
    const ingredients = [bun, ...fillings, bun];
    const ids = ingredients.map(item => item._id);
    setIsLoaderVisible(true);
    dispatch(makeOrder(ids));
  }, [dispatch, bun, fillings, navigate, user])

  const orderNumber = useAppSelector(selectOrderNumber);

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

  useEffect(() => {
      orderNumber && setIsLoaderVisible(false)
    },
      [orderNumber]);

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
          data-test-button='makeOrder'
        >
          Оформить заказ
        </Button>
      </div>
      {isLoaderVisible && (<Loader/>)}
      {orderNumber && (
        <Modal onClose={closeOrderModal}>
          <OrderAccepted/>
        </Modal>
      )}
    </>
  );
}
