import styles from './burger-ingredients.module.scss';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";

export default function BurgerIngredients() {
  const [current, setCurrent] = useState('buns')
  return (
    <section className='pt-10'>
      <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
      <div style={{ display: 'flex' }} className='pb-5'>
        <Tab value="one" active={current === 'buns'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'sauces'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
    </section>
  )
}