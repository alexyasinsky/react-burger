import styles from './burger-constructor.module.scss';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import BurgerConstructorTotal from './burger-constructor-total/burger-constructor-total';
import {useDispatch, useSelector} from "react-redux";
import {selectCart} from "../../services/store/ingredients/selectors";
import { makeOrder } from '../../services/store/ingredients/actions';

export default function BurgerConstructor() {

  const cart = useSelector(selectCart);

  const bun = cart.find(item => item.type === 'bun');
  const filling = cart.filter(item => item.type !== 'bun');

  const dispatch = useDispatch();

  const orderButtonHandler = useCallback(()=> {
    const ids = cart.map(item => item._id);
    dispatch(makeOrder(ids));
  }, [dispatch])
  
  const totalSum = useMemo(
    () => bun.price * 2 + filling.reduce((acc, item) => acc + item.price, 0),
    [bun, filling]
  );

  return (
    <section className="pt-20">
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${bun.name} (верх)`}
        price={bun.price}
        thumbnail={bun.image}
        extraClass="mr-4 ml-8"
      />
      <div className={`${styles.filling} custom-scroll pr-2`}>
        {filling.map((item) => {
          return (
            <div className={styles.filling__item} key={uuid()}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
          );
        })}
      </div>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${bun.name} (низ)`}
        price={bun.price}
        thumbnail={bun.image}
        extraClass="mr-4 ml-8"
      />
      <BurgerConstructorTotal sum={totalSum} orderButtonHandler={orderButtonHandler}/>
    </section>
  );
}
