import styles from './burger-ingredients.module.scss';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {selectIngredients} from '../../services/store/burger-ingredients/reducers';
import {useSelector} from 'react-redux';
import {useEffect, useMemo, useRef, useState} from "react";
import BurgerIngredientsGroup from "./burger-ingredients-group/burger-ingredients-group";

export default function BurgerIngredients() {

  const list = useSelector(selectIngredients);

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

  const [currentTab, setCurrentTab] = useState('buns');
  const [tabsRect, setTabsRect] = useState({});

  const tabsRef = useRef();

  const ingredientsGroupRef = {
    buns: useRef(),
    sauces: useRef(),
    main: useRef(),
  }
  function scrollHandler() {
    const { y: bunY }= ingredientsGroupRef.buns.current.getBoundingClientRect();
    const { y: saucesY }= ingredientsGroupRef.sauces.current.getBoundingClientRect();
    const { y: mainY }= ingredientsGroupRef.main.current.getBoundingClientRect();
    Math.abs(bunY) - tabsRect.y <= 100  && setCurrentTab('buns');
    Math.abs(saucesY) - tabsRect.y <= 100  && setCurrentTab('sauces');
    Math.abs(mainY) - tabsRect.y <= 100  && setCurrentTab('main');
  }
  function saucesTabClickHandler(e) {
    setCurrentTab(e);
    ingredientsGroupRef[e].current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    setTabsRect(tabsRef.current.getBoundingClientRect());
  }, []);

  return (
    <section className={`${styles.wrapper}`}>
      <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
      <div className={`${styles.tabs} pb-5`} ref={tabsRef}>
        <Tab value="buns" active={currentTab === 'buns'} onClick={saucesTabClickHandler}>
          Булки
        </Tab>
        <Tab value="sauces" active={currentTab === 'sauces'} onClick={saucesTabClickHandler}>
          Соусы
        </Tab>
        <Tab value="main" active={currentTab === 'main'} onClick={saucesTabClickHandler}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.list} custom-scroll`} onScroll={scrollHandler}>
        <BurgerIngredientsGroup title='Булки' ingredients={buns} ref={ingredientsGroupRef.buns}/>
        <BurgerIngredientsGroup title='Соусы' ingredients={sauces} ref={ingredientsGroupRef.sauces}/>
        <BurgerIngredientsGroup title='Начинки' ingredients={main} ref={ingredientsGroupRef.main}/>
      </div>
    </section>

  );
}
