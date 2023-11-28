import styles from './burger-ingredient-list.module.scss';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo, useState } from 'react';
import BurgerIngredient from './components/burger-ingredient/burger-ingredient';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import { v4 as uuid } from 'uuid';

export default function BurgerIngredientList({ list }) {
  const [current, setCurrent] = useState('buns');

  const buns = useMemo(
    () => list.filter((item) => item.type === 'bun'),
    [list]
  );

  const sauces = useMemo(
    () => list.filter((item) => item.type === 'sauce'),
    [list]
  );

  const main = useMemo(
    () => list.filter((item) => item.type === 'main'),
    [list]
  );



  return (
    <section className={`${styles.wrapper} pt-8`}>
      <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
      <div className={`${styles.tabs} pb-5`}>
        <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.sorted} custom-scroll`}>
      <article>
        <h2 className="text text_type_main-medium pt-2 pb-6">Булки</h2>
        <div className={styles.list}>
          {buns.map((item) => {
            return (<BurgerIngredient key={uuid()} ingredient={item} />);
          })}
        </div>
      </article>
      <article>
        <h2 className="text text_type_main-medium pt-2 pb-6">Соусы</h2>
        <div className={styles.list}>
          {sauces.map((item) => {
            return (<BurgerIngredient key={uuid()} ingredient={item} />);
          })}
        </div>
      </article>
      <article>
        <h2 className="text text_type_main-medium pt-2 pb-6">Начинки</h2>
        <div className={styles.list}>
          {main.map((item) => {
            return <BurgerIngredient key={uuid()} ingredient={item} />;
          })}
        </div>
      </article>
      </div>
    </section>
  );
}

BurgerIngredientList.propTypes = {
  list: PropTypes.arrayOf(ingredientPropType).isRequired,
  cart: PropTypes.shape({
    bun: ingredientPropType.isRequired,
    filling: PropTypes.arrayOf(ingredientPropType).isRequired,
  }),
};
