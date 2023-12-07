import styles from './burger-ingredients.module.scss';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {selectIngredientsList} from '../../services/store/ingredients/selectors';
import {useSelector} from 'react-redux';
import {useMemo, useState} from "react";
import BurgerIngredientsGroup from "./components/burger-ingredients-group/burger-ingredients-group";

export default function BurgerIngredients() {

  const list = useSelector(selectIngredientsList);

  const [currentTab, setCurrentTab] = useState('buns');

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
        <Tab value="buns" active={currentTab === 'buns'} onClick={setCurrentTab}>
          Булки
        </Tab>
        <Tab value="sauces" active={currentTab === 'sauces'} onClick={setCurrentTab}>
          Соусы
        </Tab>
        <Tab value="main" active={currentTab === 'main'} onClick={setCurrentTab}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.sorted} custom-scroll`}>
        <BurgerIngredientsGroup title='Булки' ingredients={buns}/>
        <BurgerIngredientsGroup title='Соусы' ingredients={sauces}/>
        <BurgerIngredientsGroup title='Начинки' ingredients={main}/>
      </div>
    </section>

  );
}
