import styles from './burger-ingredient-list.module.scss';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useMemo, useState} from "react";
import BurgerIngredient from "./components/burger-ingredient/burger-ingredient";
import PropTypes from "prop-types";
import {ingredientPropType} from "../../utils/prop-types";

export default function BurgerIngredientList({list}) {

  const [current, setCurrent] = useState('buns');

  const buns = useMemo(() => list.filter(item => item.type === 'bun'), [list]);
  const sauces = useMemo(() => list.filter(item => item.type === 'sauce'), [list]);
  const main = useMemo(() => list.filter(item => item.type === 'main'), [list]);

  let title = '';
  let items = [];

  switch (current) {
    case 'buns':
      title = 'Булки';
      items = [...buns];
      break;
    case 'sauces':
      title = 'Соусы';
      items = [...sauces];
      break;
    default:
      title = 'Начинки';
      items = [...main];
  }
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
      <article>
        <h2 className="text text_type_main-medium pt-2 pb-6">{title}</h2>
        <div className={`${styles.list} custom-scroll`}>
          {
            items.map((item, ind) => {
              return (
                <BurgerIngredient key={ind} ingredient={item}/>
              )
            })
          }
        </div>
      </article>
    </section>
  )
}

BurgerIngredientList.propTypes = {
  list: PropTypes.arrayOf(ingredientPropType).isRequired,
  cart: PropTypes.shape({
    bun: ingredientPropType.isRequired,
    filling: PropTypes.arrayOf(ingredientPropType).isRequired,
  })
}

