import styles from './burger-constructor.module.scss';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../services/prop-types';
import { v4 as uuid } from 'uuid';
import BurgerConstructorTotal from './burger-constructor-total/burger-constructor-total';

export default function BurgerConstructor({ cart }) {
  const { bun, filling } = cart;
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
      <BurgerConstructorTotal sum={totalSum} />
    </section>
  );
}

BurgerConstructor.propTypes = {
  cart: PropTypes.shape({
    bun: ingredientPropType.isRequired,
    filling: PropTypes.arrayOf(ingredientPropType).isRequired,
  }),
};
